import EmbeddedPostgres from 'embedded-postgres';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'dotenv';
import { readFileSync } from 'node:fs';

const directory = resolve('.local/postgres');
mkdirSync('.local', { recursive: true });
if (!existsSync('.env')) {
  const password = randomBytes(24).toString('hex');
  writeFileSync('.env', 'DATABASE_URL="postgresql://leyou:' + password + '@127.0.0.1:54329/leyou?schema=public"\n', { mode: 0o600 });
}
const env = parse(readFileSync('.env'));
const url = new URL(env.DATABASE_URL);
if (url.hostname !== '127.0.0.1' || url.port !== '54329' || url.pathname !== '/leyou') {
  throw new Error('db:local expects the local database at 127.0.0.1:54329/leyou. Use your existing server instead.');
}
const pg = new EmbeddedPostgres({
  databaseDir: directory, user: decodeURIComponent(url.username), password: decodeURIComponent(url.password),
  port: 54329, persistent: true, authMethod: 'scram-sha-256', postgresFlags: ['-h', '127.0.0.1'],
  onLog: () => {}, onError: () => console.error('Local PostgreSQL reported an error.'),
});
if (!existsSync(resolve(directory, 'PG_VERSION'))) await pg.initialise();
await pg.start();
const client = pg.getPgClient();
await client.connect();
const result = await client.query("SELECT 1 FROM pg_database WHERE datname = 'leyou'");
await client.end();
if (!result.rows.length) await pg.createDatabase('leyou');
console.log('Local PostgreSQL ready on 127.0.0.1:54329. Keep this terminal open. Ctrl+C stops it; data persists.');
let stopping = false;
async function stop() { if (stopping) return; stopping = true; await pg.stop(); process.exit(0); }
process.on('SIGINT', stop); process.on('SIGTERM', stop);
setInterval(() => {}, 60_000);

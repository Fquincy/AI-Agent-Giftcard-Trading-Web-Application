import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
try {
  for (const [id, name] of [['amazon', 'Amazon'], ['apple', 'Apple'], ['google-play', 'Google Play']]) {
    await db.giftCardType.upsert({ where: { id }, create: { id, name }, update: { name } });
    for (const [currency, amountPerUsd] of [['NGN', '1000.0000'], ['GHS', '10.0000']]) {
      await db.rate.upsert({ where: { cardTypeId_currency: { cardTypeId: id, currency } }, create: { cardTypeId: id, currency, amountPerUsd }, update: {} });
    }
  }
  console.log('Seeded fictional card types and rates. These are not live market quotes.');
} finally { await db.$disconnect(); }

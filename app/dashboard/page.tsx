import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../lib/auth';
import { db } from '../lib/db';
import LogoutButton from './logout-button';
import './dashboard.css';
export const dynamic = 'force-dynamic';
export default async function Dashboard() {
  let user;
  try { user = await getCurrentUser(); } catch {
    return <main className="dashboard"><h1>Account temporarily unavailable</h1><p>Please try again shortly.</p><Link href="/login">Return to login</Link></main>;
  }
  if (!user) redirect('/login');
  let trades;
  try {
    trades = await db.trade.findMany({ where: { userId: user.id }, include: { cardType: true }, orderBy: { createdAt: 'desc' }, take: 50 });
  } catch {
    return <main className="dashboard"><h1>Trades temporarily unavailable</h1><LogoutButton /></main>;
  }
  return <main className="dashboard">
    <header><Link href="/"><Image src="/logo (1).png" alt="Leyou Exchange" width={180} height={42} priority /></Link><LogoutButton /></header>
    <section><p className="dashboard-label">Your account</p><h1>Welcome, {user.name}</h1><p>{user.email}</p><p>Country: {user.country === 'nigeria' ? 'Nigeria' : 'Ghana'}</p></section>
    <section><h2>Your trades</h2><p>This is a learning application with fictional data. Trading and payouts are coming later.</p>
    {trades.length ? <div className="dashboard-table"><table><thead><tr><th>Card</th><th>Amount</th><th>Status</th></tr></thead><tbody>{trades.map(trade => <tr key={trade.id}><td>{trade.cardType.name}</td><td>{new Intl.NumberFormat('en', { style: 'currency', currency: trade.currency }).format(trade.amountMinor / 100)}</td><td>{trade.status}</td></tr>)}</tbody></table></div> : <p>You have no trades yet.</p>}</section>
  </main>;
}

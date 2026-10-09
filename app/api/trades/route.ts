import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '../../lib/auth';
import { db } from '../../lib/db';
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Please log in' }, { status: 401 });
    const id = request.nextUrl.searchParams.get('id');
    const trades = await db.trade.findMany({
      where: { userId: user.id, ...(id ? { id } : {}) },
      select: { id: true, amountMinor: true, currency: true, status: true, createdAt: true, cardType: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }, take: 50,
    });
    if (id && !trades.length) return NextResponse.json({ error: 'Trade not found' }, { status: 404 });
    return NextResponse.json({ trades }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Trades are temporarily unavailable' }, { status: 503 });
  }
}

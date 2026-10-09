'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function LogoutButton() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function logout() {
    setBusy(true);
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (!response.ok) { setMessage('Unable to log out. Please try again.'); return; }
      router.replace('/login'); router.refresh();
    } catch { setMessage('Check your connection and try again.'); }
    finally { setBusy(false); }
  }
  return <div><button className="dashboard-button" onClick={logout} disabled={busy}>{busy ? 'Logging out...' : 'Log out'}</button>{message && <p role="alert">{message}</p>}</div>;
}

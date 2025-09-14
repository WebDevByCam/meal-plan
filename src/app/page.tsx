import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function Home() {
  // If user is authenticated, send to dashboard, otherwise to login
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  redirect('/login');
}

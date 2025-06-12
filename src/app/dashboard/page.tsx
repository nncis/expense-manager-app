import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard(){

  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard/record');
  }

  return (
    <main>
      Dashboard
    </main>
  )
}
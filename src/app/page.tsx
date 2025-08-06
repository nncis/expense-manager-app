import style from "./page.module.css";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {

    const session = await getServerSession(authOptions);
    console.log(session?.user)
    if (session) {
      redirect('/dashboard/record');
    }

  return (
    <main className={style.getStartedPage}>
      <h1 className={style.getStartedTitle}>Expense Manager</h1>
      <p className={style.getStartedSubTitle}>See where you spend the most and save better</p>
       <Link 
        href="/login"
        className={style.letsGoBtn}
       >
        GET STARTED
       </Link>
    </main>
  );
}

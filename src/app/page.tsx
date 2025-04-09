
import style from "./page.module.css";
import Link from "next/link";

export default function Home() {
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

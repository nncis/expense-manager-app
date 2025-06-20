import Table from "@/ui/expenses/table";
import { fetchExpensePages } from "@/lib/data";
import Pagination from "@/ui/expenses/pagination";
import Search from "@/ui/expenses/search";
import style from '@/styles/expenses.module.css'


export default async function Expenses(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}){

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchExpensePages(query);

  return (
      <main className={style.expensesMainPage}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>Expenses</h1>
        </div>
        <Search />
        <Table query={query} currentPage={currentPage}/>
        <Pagination totalPages={totalPages || 1}/>
      </main>
  )
}
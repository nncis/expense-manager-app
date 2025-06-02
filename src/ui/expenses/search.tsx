'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import style from '@/styles/expenses.module.css';
import { categories } from '@/lib/definitions';

//Basicamente Search crea una URL y reemplaza la URL actual con la info que el usario quiere buscar, para que en page.tsx pueda leer esa URL y utilizar esa info para realizar las consultas a la base de datos

//Ex: Si el usuario selecciona la categoria "Greengrocery" la URL se actualiza a 'expense?page=1&query=Greengrocery'

export default function Search() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  
  return (
    <div className={style.filterButtonsContainer}>
      {/* <label htmlFor="search">
      </label>
      <input 
        placeholder='Search expense'
        onChange={(e) => {
          handleSearch(e.target.value);
        }}  
        defaultValue={searchParams.get('query')?.toString()}
        /> */}

      {/* <MagnifyingGlassIcon className={style.glassIcon}></MagnifyingGlassIcon> */}
      <div className={style.filterExpenseContainer}>
          <label className={style.filterTitle}>
            Filter by category
          </label>
          <select 
            id='category'
            name='category'
            defaultValue=''
            aria-describedby="expense-error"
            onChange={(e) => {handleSearch(e.target.value)}}
          >
            <option value=''>
              All
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
    </div>
  )
}
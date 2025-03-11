'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import style from '@/styles/nav.module.css'
import { PencilSquareIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const links = [
  {
    name: 'Record',
    href: '/dashboard/record',
    icon: PencilSquareIcon
  },
  { 
    name: 'Expenses', 
    href: '/dashboard/expenses',
    icon: BookOpenIcon
  },
  { 
    name: 'Resume', 
    href: '/dashboard/resume',
    icon: ChartBarIcon
  },
];

export default function NavLinks() {

  const pathname = usePathname();

  return (
    <>
    {links.map((link) => {
      return (
        <Link 
          key={link.name}
          href={link.href}
          className={clsx(
            style.link ,{
                [style.linkActive]: pathname === link.href},
          )}
        >
          {<link.icon className={style.icon}/>}
          <p className={style.navTitle}>{link.name}</p>
        </Link>
      )
    })}
    </>
  )
}
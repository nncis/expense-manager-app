'use client'

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar( ){
  return (
      <nav>
        <li>
          <ol>
            <Link href='/dashboard'>Dashboard</Link>
          </ol>
          <ol>
            <Link href='/dashboard/record'>Record</Link>
          </ol>
          <ol>
            <Link href='/dashboard/expenses'>Expenses</Link>
          </ol>
          <ol>
            <Link href='/'>Home</Link>
          </ol>
        </li>
        <button
           onClick={() => signOut({ callbackUrl: "/" })}
          >
          Sign Out
        </button>
      </nav>
  )
};
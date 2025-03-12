import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main >
      <FaceFrownIcon />
      <h2 >404 Not Found</h2>
      <p>Could not find the requested expense.</p>
      <Link
        href="/dashboard/expenses"
      >
        Go Back
      </Link>
    </main>
  );
}
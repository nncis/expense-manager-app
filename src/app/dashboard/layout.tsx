'use client'

import style from '@/styles/dashboard.module.css';
import Navbar from "@/ui/Nav/Navbar";
import { useViewportHeight } from "@/lib/hooks";

export default function Layout({ children }: { children: React.ReactNode }) {
  useViewportHeight()
  return (
      <div className={`${style.dashboardContainer} full-height`}>
          <Navbar/>
          {children}
      </div>
  );
}
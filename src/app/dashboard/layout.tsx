import style from '@/styles/dashboard.module.css';
import Navbar from "@/ui/Nav/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className={style.dashboardContainer}>
          <Navbar/>
          {children}
      </div>
  );
}
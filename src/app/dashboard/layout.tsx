import style from '@/styles/dashboard.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className={style.dashboardContainer}>
          {children}
      </div>
  );
}
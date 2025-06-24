import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { List, PlusCircle } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse on screen < 600px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  const mainMargin = collapsed ? 'ml-16' : 'ml-64';

  return (
    <div className="min-h-screen">
      <header className="header text-white h-16 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={() => setCollapsed(!collapsed)} className="text-2xl text-white
">
            ☰
          </button>
          <h1 className="text-xl font-bold text-white">Job Board</h1>
        </div>
      </header>

      <aside
        className={`fixed top-16 left-0 ${sidebarWidth} h-[calc(100vh-4rem)] bg-gray-800 text-white shadow-lg z-40 transition-all duration-300`}
      >
        <nav className="pt-6 space-y-1 divide-y divide-gray-700 ">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700"
          >
            <List size={18} />
            {!collapsed && <span>Job Listings</span>}
          </Link>
          <Link
            href="/add-job"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 "
          >
            <PlusCircle size={18} />
            {!collapsed && <span>Add Job</span>}
          </Link>
        </nav>
        {!collapsed && (
  <div className="absolute bottom-0 w-full">
    <div className="bg-[url('/side.png')] bg-cover bg-center side-img h-32"></div>
  </div>
)}

      </aside>

      <main className={`pt-20 ${mainMargin} p-6 transition-all duration-300 main-bdy`} >
        {children}
      </main>
    </div>
  );
}

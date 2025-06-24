import Link from 'next/link';
import { Briefcase, PlusCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className=" shadow-md p-4 flex justify-between items-center">
      <Link href="/jobs" className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <Briefcase className="w-6 h-6" />
        Job Board
      </Link>

      <div className="flex gap-4">
        <Link href="/jobs" className="text-gray-700 hover:text-blue-500">
          Jobs
        </Link>
        <Link href="/add-job" className="text-gray-700 hover:text-blue-500 flex items-center gap-1">
          <PlusCircle className="w-4 h-4" />
          Add Job
        </Link>
      </div>
      <div>
        get your best job
      </div>
    </nav>
  );
} 

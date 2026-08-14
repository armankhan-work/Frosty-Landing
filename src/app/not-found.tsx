import Link from 'next/link';
import FrostyIcon from '@/components/FrostyIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFBF9] text-[#18181B] px-6 text-center">
      <div className="mb-4">
        <FrostyIcon size={48} />
      </div>
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">404 — Page Not Found</h1>
      <p className="text-slate-600 text-sm max-w-md mb-6 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#5F23C8] text-white font-bold text-sm hover:bg-[#4C1D95] shadow-sm transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}

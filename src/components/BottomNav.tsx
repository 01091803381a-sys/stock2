import { Home, BarChart2, Search, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-lg border-t border-white/5 flex justify-around items-center px-4 pb-safe z-40">
      <button className="flex flex-col items-center gap-1 text-primary">
        <Home className="w-6 h-6 fill-primary/10" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors">
        <BarChart2 className="w-6 h-6" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Market</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors">
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors">
        <Wallet className="w-6 h-6" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Portfolio</span>
      </button>
    </nav>
  );
}

import { LayoutGrid, TrendingUp, History, Settings } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: LayoutGrid, label: 'Accounts' },
    { icon: TrendingUp, label: 'Watchlist' },
    { icon: History, label: 'History' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action, i) => (
        <button 
          key={i} 
          className="bg-surface-container border border-outline p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary transition-all group cursor-pointer"
        >
          <div className="text-on-surface-variant group-hover:text-primary transition-colors group-hover:scale-110 duration-300">
            <action.icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-white transition-colors">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

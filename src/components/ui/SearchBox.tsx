import { Search } from 'lucide-react';

export default function SearchBox() {
  return (
    <div className="relative group">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant group-focus-within:text-white transition-colors" />
      <input 
        type="text" 
        placeholder="SEARCH MARKET ENTITIES..."
        className="w-full bg-surface-container border border-outline rounded-2xl py-6 pl-16 pr-6 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-primary transition-all placeholder:text-on-surface-variant italic"
      />
    </div>
  );
}

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StockData } from '../../types';
import { cn } from '../../lib/utils';

interface MarketItemProps {
  stock: StockData;
  onClick: () => void;
}

const MarketItem: React.FC<MarketItemProps> = ({ stock, onClick }) => {
  const isPositive = stock.change >= 0;

  return (
    <div 
      onClick={onClick}
      className="p-6 flex items-center justify-between hover:bg-white/[0.03] transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-surface flex items-center justify-center font-black text-white italic border border-outline group-hover:border-primary transition-all uppercase tracking-tighter">
          {stock.name[0]}
        </div>
        <div>
          <h4 className="text-lg font-black text-white tracking-tight italic uppercase">{stock.name}</h4>
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{stock.ticker}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("text-xl font-black tabular-nums tracking-tighter italic", isPositive ? "text-up" : "text-down")}>
          {stock.price.toLocaleString()}
        </p>
        <div className={cn(
          "text-xs flex items-center justify-end font-black uppercase italic tracking-tight",
          isPositive ? "text-up" : "text-down"
        )}>
          {isPositive ? '▲' : '▼'} {Math.abs(stock.changePercent)}%
        </div>
      </div>
    </div>
  );
};

export default MarketItem;

import { motion } from 'motion/react';
import type { MarketIndex } from '../../types';
import { marketIndices } from '../../data/mockData';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TickerTape({ indices, className }: { indices: MarketIndex[], className?: string }) {
  return (
    <div className={cn("w-full bg-surface-container overflow-hidden py-1 border-b border-outline whitespace-nowrap", className)}>
      <motion.div
        className="flex gap-16 items-center w-max"
        animate={{ x: [0, -500] }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear"
        }}
      >
        {[...indices, ...indices, ...indices].map((index, idx) => (
          <div key={idx} className="flex items-center gap-4 border-r border-outline pr-16 h-8">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest leading-none">{index.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tabular-nums text-white lg:text-sm tracking-tighter italic">
                  {index.value.toLocaleString()}
                </span>
                <span className={cn(
                  "text-[10px] font-black italic",
                  index.change >= 0 ? "text-up" : "text-down"
                )}>
                  {index.change >= 0 ? '▲' : '▼'} {Math.abs(index.changePercent)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

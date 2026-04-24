import { motion } from 'motion/react';
import type { DetailedStockData } from '../types';
import PriceChart from './ui/PriceChart';
import { TrendingUp, TrendingDown, Star, Share2, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface StockDetailProps {
  stock: DetailedStockData;
  onBack: () => void;
}

export default function StockDetail({ stock, onBack }: StockDetailProps) {
  const isPositive = stock.change >= 0;

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-surface z-50 flex flex-col lg:flex-row overflow-hidden font-sans"
    >
      {/* Sidebar for Mobile/Header for Desktop */}
      <div className="w-full lg:w-[450px] lg:border-r border-outline flex flex-col bg-surface-container p-8 space-y-10 shrink-0 overflow-y-auto">
        <button onClick={onBack} className="w-max p-2 -ml-2 text-on-surface-variant hover:text-white transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase">{stock.ticker.split('.')[0]}</span>
            <span className="text-on-surface-variant text-xs font-black uppercase tracking-widest">{stock.category}</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter italic line-height-none uppercase">
            {stock.name}
          </h1>

          <div className="space-y-2">
            <div className="text-6xl lg:text-7xl font-black text-white tracking-tighter line-height-none italic">
              {stock.price.toLocaleString()} 
              <span className="text-xl font-medium tracking-normal ml-2 not-italic opacity-50">KRW</span>
            </div>
            <div className={cn(
              "text-2xl font-black italic tracking-tight",
              isPositive ? "text-up" : "text-down"
            )}>
              {isPositive ? '▲' : '▼'} {Math.abs(stock.change).toLocaleString()} ({Math.abs(stock.changePercent)}%)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="h-16 border-2 border-primary text-primary font-black uppercase text-sm italic tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all">Buy Unit</button>
          <button className="h-16 border-2 border-outline text-on-surface-variant font-black uppercase text-sm italic tracking-widest rounded-xl hover:bg-white hover:text-surface transition-all">Sell Unit</button>
        </div>

        <div className="hidden lg:block space-y-4 pt-10">
          <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4">Stock Vital Statistics</div>
          <div className="space-y-4 divide-y divide-outline">
            {[
              { label: 'Market Cap', value: stock.marketCap },
              { label: 'Dividend Yield', value: stock.dividendYield },
              { label: '52 Week High', value: stock.high52w.toLocaleString() },
              { label: '52 Week Low', value: stock.low52w.toLocaleString() },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between py-4 group">
                <span className="text-xs font-black text-on-surface-variant uppercase tracking-wider group-hover:text-primary transition-colors">{stat.label}</span>
                <span className="text-sm font-black text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Area */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
        {/* Chart View */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Trend <span className="text-primary italic">Analysis</span></h3>
            <div className="flex space-x-2">
              {['1D', '1W', '1M', '1Y', 'ALL'].map(range => (
                <button key={range} className={cn(
                  "px-4 py-2 text-[10px] font-black transition-all rounded-full uppercase tracking-widest",
                  range === '1D' ? "bg-primary text-white" : "text-on-surface-variant hover:text-white"
                )}>
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[400px] bg-surface-container rounded-3xl border border-outline relative p-8">
            <PriceChart data={stock.chartData} isPositive={isPositive} />
          </div>
        </div>

        {/* Financial Performance Grid */}
        <div className="space-y-6 pb-24 lg:pb-0">
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Financial <span className="text-primary italic">Blueprint</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container p-6 rounded-2xl border border-outline flex flex-col justify-between h-44 group hover:border-primary transition-colors">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-primary transition-colors">Revenue (Avg)</div>
              <div className="text-3xl font-black text-white tracking-tighter italic">₩{stock.revenue[stock.revenue.length-1]}T</div>
              <div className="text-[10px] text-success font-black uppercase tracking-widest">Growth Secure</div>
            </div>
            <div className="bg-surface-container p-6 rounded-2xl border border-outline flex flex-col justify-between h-44 group hover:border-primary transition-colors">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-primary transition-colors">Operating Profit</div>
              <div className="text-3xl font-black text-white tracking-tighter italic">₩{stock.operatingProfit[stock.operatingProfit.length-1]}T</div>
              <div className="text-[10px] text-success font-black uppercase tracking-widest">Healthy Margin</div>
            </div>
            <div className="bg-surface-container p-6 rounded-2xl border border-outline flex flex-col justify-between h-44 group hover:border-primary transition-colors">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-primary transition-colors">Equity Return</div>
              <div className="text-3xl font-black text-white tracking-tighter italic">{stock.roe}% ROE</div>
              <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest opacity-50">Industrial Leader</div>
            </div>
            <div className="bg-surface-container p-6 rounded-2xl border border-outline flex flex-col justify-between h-44 group hover:border-primary transition-colors">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-primary transition-colors">Earnings Multiplier</div>
              <div className="text-3xl font-black text-down tracking-tighter italic">{stock.per}x PER</div>
              <div className="text-[10px] text-down font-black uppercase tracking-widest">Active Signal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-6 left-6 right-6 flex gap-4">
        <button className="flex-1 h-16 bg-primary text-white font-black italic uppercase text-lg tracking-tighter rounded-2xl shadow-2xl shadow-primary/30 active:scale-95 transition-transform">Buy Now</button>
      </div>
    </motion.div>
  );
}

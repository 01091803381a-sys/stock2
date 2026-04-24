/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Search, MoreHorizontal, ArrowUpRight, Activity } from 'lucide-react';
import TickerTape from './components/ui/TickerTape';
import SearchBox from './components/ui/SearchBox';
import QuickActions from './components/ui/QuickActions';
import MarketItem from './components/ui/MarketItem';
import BottomNav from './components/BottomNav';
import StockDetail from './components/StockDetail';
import { MarketCategory, type DetailedStockData, type MarketIndex } from './types';
import { domesticStocks, overseasStocks, etfStocks, marketIndices } from './data/mockData';
import { cn } from './lib/utils';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>(MarketCategory.DOMESTIC);
  const [selectedStock, setSelectedStock] = useState<DetailedStockData | null>(null);
  
  // Real-time state
  const [indices, setIndices] = useState<MarketIndex[]>(marketIndices);
  const [dStocks, setDStocks] = useState<DetailedStockData[]>(domesticStocks);
  const [oStocks, setOStocks] = useState<DetailedStockData[]>(overseasStocks);
  const [eStocks, setEStocks] = useState<DetailedStockData[]>(etfStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate indices
      setIndices(prev => prev.map(idx => ({
        ...idx,
        value: idx.value + (Math.random() * 2 - 1) * (idx.value * 0.0005)
      })));

      // Fluctuate stocks
      const updateStocks = (list: DetailedStockData[]) => list.map(s => ({
        ...s,
        price: s.price + (Math.random() * 2 - 1) * (s.price * 0.001)
      }));

      setDStocks(prev => updateStocks(prev));
      setOStocks(prev => updateStocks(prev));
      setEStocks(prev => updateStocks(prev));

      // Also update selected stock if it exists
      setSelectedStock(prev => prev ? ({
        ...prev,
        price: prev.price + (Math.random() * 2 - 1) * (prev.price * 0.001)
      }) : null);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStocks = () => {
    switch (activeCategory) {
      case MarketCategory.DOMESTIC: return dStocks;
      case MarketCategory.OVERSEAS: return oStocks;
      case MarketCategory.ETF: return eStocks;
      default: return [];
    }
  };

  const stocks = getStocks();

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary/30 font-sans overflow-hidden">
      {/* Top Ticker Bar */}
      <TickerTape indices={indices} className="h-10 border-b border-outline bg-surface-container" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation - Desktop View */}
        <aside className="hidden lg:flex w-72 border-r border-outline flex-col p-8 space-y-12 bg-surface-container shrink-0">
          <div className="text-3xl font-black text-white tracking-tighter italic shrink-0 uppercase">
            STOCK<span className="text-primary tracking-normal">BOARD</span>
          </div>
          
          <nav className="space-y-10">
            <div className="group">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">Markets</div>
              <ul className="space-y-4 text-sm font-bold">
                {Object.values(MarketCategory).map((cat) => (
                  <li 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "cursor-pointer pl-4 border-l-2 transition-all hover:text-white",
                      activeCategory === cat ? "text-white border-primary" : "text-on-surface-variant border-transparent"
                    )}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4">My Watchlist</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-xs font-bold transition-colors group-hover:text-white">Samsung Elec.</span>
                  <span className="text-xs font-black text-up">+1.2%</span>
                </div>
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-xs font-bold transition-colors group-hover:text-white">NVIDIA</span>
                  <span className="text-xs font-black text-down">-0.8%</span>
                </div>
              </div>
            </div>
          </nav>

          <div className="mt-auto p-6 bg-surface rounded-2xl border border-outline relative overflow-hidden group">
            <div className="text-[10px] font-black text-on-surface-variant mb-1 uppercase tracking-widest">Portfolio Value</div>
            <div className="text-2xl font-black text-white tracking-tighter">₩145.2M</div>
            <div className="text-xs text-up mt-2 font-black flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              ▲ 3.2%
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 -ml-2 text-on-surface-variant">
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-black text-xl text-primary tracking-tighter uppercase italic">StockBoard</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=stockboard" alt="avatar" />
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop py-8 space-y-10 pb-32 lg:pb-8">
            {/* Search Box */}
            <div className="max-w-2xl">
              <SearchBox />
            </div>

            {/* Selected Stock Display Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase">Live</span>
                  <span className="text-on-surface-variant text-xs font-black uppercase tracking-widest">Market Status</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter line-height-none uppercase italic">
                  Market <span className="text-primary italic">Pulse</span>
                </h1>
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Asset Chart - Bento Wide */}
              <div className="lg:col-span-8 bg-surface-container rounded-3xl border border-outline p-8 flex flex-col justify-between h-[400px] hover:border-primary/50 transition-colors cursor-crosshair relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Asset Growth Pattern</p>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Real-time</span>
                    </div>
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter italic">₩ 145,280,000</h2>
                  <div className="text-sm font-black text-up mt-2 italic flex items-center gap-1 uppercase tracking-tight">
                    Running +12.4% Over Baseline
                  </div>
                </div>

                <div className="relative h-40 flex items-end justify-between gap-1.5 mt-auto">
                  {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 1.0].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: "circOut" }}
                      className={cn(
                        "flex-1 rounded-t-xs transition-all duration-500",
                        i === 6 ? "bg-primary shadow-[0_0_20px_rgba(248,81,73,0.3)]" : "bg-primary/20 hover:bg-primary/40"
                      )}
                    />
                  ))}
                </div>
                
                <div className="absolute top-0 right-0 p-8">
                   <button className="px-6 py-3 bg-white text-black font-black uppercase text-xs italic tracking-widest rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
                      Optimize Portfolio
                   </button>
                </div>
              </div>

              {/* Action Column */}
              <div className="lg:col-span-4 space-y-8">
                <QuickActions />
                <div className="bg-surface-container rounded-3xl border border-outline p-8 flex flex-col justify-between h-44 hover:border-primary transition-colors cursor-pointer group">
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-primary transition-colors">Market Cap Exposure</p>
                  <div className="text-3xl font-black text-white italic tracking-tighter">64.2% TECH</div>
                  <div className="h-2 bg-outline rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "64.2%" }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-primary shadow-[0_0_10px_rgba(248,81,73,0.5)]" 
                    />
                  </div>
                </div>
              </div>

              {/* Ranking List */}
              <div className="lg:col-span-12 bg-surface-container rounded-3xl border border-outline overflow-hidden">
                <div className="p-8 lg:p-10 flex justify-between items-center border-b border-outline">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">Active <span className="text-primary italic">Movers</span></h3>
                  <button className="text-white text-[10px] font-black uppercase tracking-widest border border-outline px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all italic">
                    Explore Universe
                  </button>
                </div>
                <div className="divide-y divide-outline">
                  {stocks.map((stock) => (
                    <MarketItem 
                      key={stock.id} 
                      stock={stock} 
                      onClick={() => setSelectedStock(stock)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedStock && (
          <StockDetail 
            stock={selectedStock} 
            onBack={() => setSelectedStock(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}


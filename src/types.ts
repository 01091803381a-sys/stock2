export enum MarketCategory {
  DOMESTIC = '국내 주식',
  OVERSEAS = '해외 주식',
  ETF = 'ETF',
}

export interface StockData {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  category: MarketCategory;
}

export interface DetailedStockData extends StockData {
  marketCap: string;
  high52w: number;
  low52w: number;
  dividendYield: string;
  revenue: number[]; // Last 3 years
  operatingProfit: number[]; // Last 3 years
  roe: number;
  per: number;
  chartData: { date: string; price: number }[];
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

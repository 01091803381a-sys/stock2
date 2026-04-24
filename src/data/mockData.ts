import { MarketCategory, type DetailedStockData, type MarketIndex } from '../types';

export const marketIndices: MarketIndex[] = [
  { name: 'KOSPI', value: 2687.60, change: -34.21, changePercent: -1.26 },
  { name: 'NASDAQ', value: 16736.03, change: -65.51, changePercent: -0.39 },
  { name: 'S&P 500', value: 5267.84, change: -39.17, changePercent: -0.74 },
  { name: 'USD/KRW', value: 1369.50, change: 5.00, changePercent: 0.37 },
];

const generateChartData = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice * 1.02; // Start slightly higher for intraday fall
  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.55) * (basePrice * 0.005); // Bias slightly down
    currentPrice += change;
    data.push({
      date: `${String(Math.floor(9 + i/2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
      price: currentPrice,
    });
  }
  // Set the last point to exactly basePrice
  data[data.length - 1].price = basePrice;
  return data;
};

export const domesticStocks: DetailedStockData[] = [
  {
    id: 'samsung',
    name: '삼성전자',
    ticker: '005930.KS',
    price: 75900,
    change: -2400,
    changePercent: -3.07,
    category: MarketCategory.DOMESTIC,
    marketCap: '453.11T KRW',
    high52w: 86000,
    low52w: 65000,
    dividendYield: '1.84%',
    revenue: [279.6, 258.9, 302.2],
    operatingProfit: [51.6, 6.5, 43.3],
    roe: 12.4,
    per: 15.2,
    chartData: generateChartData(75900),
  },
  {
    id: 'sk-hynix',
    name: 'SK하이닉스',
    ticker: '000660.KS',
    price: 198600,
    change: -1400,
    changePercent: -0.70,
    category: MarketCategory.DOMESTIC,
    marketCap: '144.58T KRW',
    high52w: 204500,
    low52w: 110000,
    dividendYield: '0.68%',
    revenue: [42.9, 32.7, 44.6],
    operatingProfit: [12.4, -7.7, 7.0],
    roe: 8.5,
    per: 22.1,
    chartData: generateChartData(198600),
  },
  {
    id: 'naver',
    name: 'NAVER',
    ticker: '035420.KS',
    price: 178100,
    change: -300,
    changePercent: -0.17,
    category: MarketCategory.DOMESTIC,
    marketCap: '28.8T KRW',
    high52w: 232000,
    low52w: 170000,
    dividendYield: '0.42%',
    revenue: [8.2, 9.6, 10.5],
    operatingProfit: [1.3, 1.4, 1.6],
    roe: 10.2,
    per: 31.5,
    chartData: generateChartData(178100),
  },
  {
    id: 'kakao',
    name: '카카오',
    ticker: '035720.KS',
    price: 45650,
    change: -250,
    changePercent: -0.54,
    category: MarketCategory.DOMESTIC,
    marketCap: '20.2T KRW',
    high52w: 61000,
    low52w: 43000,
    dividendYield: '0.12%',
    revenue: [7.1, 8.1, 8.8],
    operatingProfit: [0.5, 0.4, 0.5],
    roe: 5.6,
    per: 45.2,
    chartData: generateChartData(45650),
  },
];

export const overseasStocks: DetailedStockData[] = [
  {
    id: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    price: 186.88,
    change: -4.10,
    changePercent: -2.15,
    category: MarketCategory.OVERSEAS,
    marketCap: '2.86T USD',
    high52w: 199.62,
    low52w: 164.08,
    dividendYield: '0.51%',
    revenue: [365.8, 394.3, 383.2],
    operatingProfit: [108.9, 119.4, 114.3],
    roe: 145.2,
    per: 29.8,
    chartData: generateChartData(186.88),
  },
  {
    id: 'nvidia',
    name: 'NVIDIA Corp.',
    ticker: 'NVDA',
    price: 1037.99,
    change: 88.49,
    changePercent: 9.32,
    category: MarketCategory.OVERSEAS,
    marketCap: '2.55T USD',
    high52w: 1037.99,
    low52w: 262.25,
    dividendYield: '0.02%',
    revenue: [26.9, 27.0, 60.9],
    operatingProfit: [10.0, 4.2, 33.0],
    roe: 91.5,
    per: 78.4,
    chartData: generateChartData(1037.99),
  },
];

export const etfStocks: DetailedStockData[] = [
  {
    id: 'kodex-200',
    name: 'KODEX 200',
    ticker: '069500.KS',
    price: 36240,
    change: -420,
    changePercent: -1.15,
    category: MarketCategory.ETF,
    marketCap: '6.42T KRW',
    high52w: 38000,
    low52w: 31000,
    dividendYield: '2.14%',
    revenue: [0, 0, 0],
    operatingProfit: [0, 0, 0],
    roe: 0,
    per: 0,
    chartData: generateChartData(36240),
  },
  {
    id: 'tiger-us-nasdaq100',
    name: 'TIGER 미국나스닥100',
    ticker: '133690.KS',
    price: 112100,
    change: -450,
    changePercent: -0.40,
    category: MarketCategory.ETF,
    marketCap: '3.12T KRW',
    high52w: 115000,
    low52w: 85000,
    dividendYield: '0.15%',
    revenue: [0, 0, 0],
    operatingProfit: [0, 0, 0],
    roe: 0,
    per: 0,
    chartData: generateChartData(112100),
  },
];


import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { DetailedStockData } from '../../types';

interface PriceChartProps {
  data: DetailedStockData['chartData'];
  isPositive: boolean;
}

export default function PriceChart({ data, isPositive }: PriceChartProps) {
  const color = isPositive ? '#F85149' : '#58A6FF';

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#30363D" strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            hide 
          />
          <YAxis 
            hide 
            domain={['dataMin - 100', 'dataMax + 100']} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '12px' }}
            itemStyle={{ color: '#C9D1D9', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase' }}
            cursor={{ stroke: '#30363D', strokeWidth: 2 }}
            labelClassName="hidden"
          />
          <Area
            type="stepAfter"
            dataKey="price"
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPrice)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

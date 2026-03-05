import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { dailyData } from '@/data/mockData';

export const ProfitChart = () => {
  const formatCurrency = (value: number) => `Rp ${(value / 1000000).toFixed(1)}M`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-success">Profit: {formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Profit Harian</h3>
        <p className="text-sm text-muted-foreground">7 hari terakhir</p>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.9} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="profit"
              fill="url(#profitGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { costComposition } from '@/data/mockData';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--warning))'];

export const CostCompositionChart = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-card border border-border/50 shadow-xl text-sm">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-muted-foreground">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="p-6 rounded-2xl bg-card/40 border border-border/30"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold">Komposisi Biaya</h3>
        <p className="text-sm text-muted-foreground">Breakdown per kategori</p>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={costComposition}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {costComposition.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3 mt-4">
        {costComposition.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.value}%`, backgroundColor: COLORS[index] }}
                />
              </div>
              <span className="text-sm font-bold number-display w-10 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

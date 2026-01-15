import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { kpiData } from '@/data/mockData';

export const Header = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
          <Calendar className="w-4 h-4" />
          <span>Januari 2025</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total HPP</p>
            <p className="text-sm font-semibold number-display">{formatCurrency(kpiData.totalHpp)}</p>
          </div>
        </div>

        <div className="w-px h-8 bg-border" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Gross Margin</p>
            <p className="text-sm font-semibold number-display text-success">{kpiData.grossMargin}%</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

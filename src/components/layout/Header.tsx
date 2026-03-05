import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Bell, Search } from 'lucide-react';
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
      className="h-16 border-b border-border/30 bg-background/60 backdrop-blur-2xl flex items-center justify-between px-6 sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-card/40 border border-border/30 text-sm text-muted-foreground w-64 hover:border-border/50 transition-colors cursor-pointer">
          <Search className="w-4 h-4" />
          <span>Cari...</span>
          <kbd className="ml-auto px-1.5 py-0.5 rounded bg-secondary/50 text-[10px] font-mono">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick stats */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">HPP</p>
              <p className="text-sm font-bold number-display">{formatCurrency(kpiData.totalHpp)}</p>
            </div>
          </div>

          <div className="w-px h-8 bg-border/30" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Margin</p>
              <p className="text-sm font-bold number-display text-success">{kpiData.grossMargin}%</p>
            </div>
          </div>
        </div>

        <div className="w-px h-8 bg-border/30 hidden lg:block" />

        {/* Notification */}
        <button className="relative w-9 h-9 rounded-xl bg-card/40 border border-border/30 flex items-center justify-center hover:bg-card/60 transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-shadow">
          M
        </div>
      </div>
    </motion.header>
  );
};

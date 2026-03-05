import { Layout } from '@/components/layout/Layout';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { CostCompositionChart } from '@/components/dashboard/CostCompositionChart';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ProfitChart } from '@/components/dashboard/ProfitChart';
import { kpiData } from '@/data/mockData';
import { Wallet, TrendingUp, Receipt, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground mb-1"
            >
              Selamat datang kembali 👋
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              Dashboard
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 border border-border/30 text-sm text-muted-foreground"
          >
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Live — Januari 2025
          </motion.div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(kpiData.totalRevenue)}
            subtitle="Bulan ini"
            icon={Wallet}
            trend={{ value: 12.5, isPositive: true }}
            variant="default"
            delay={0}
          />
          <KPICard
            title="Total HPP"
            value={formatCurrency(kpiData.totalHpp)}
            subtitle="Bulan ini"
            icon={DollarSign}
            trend={{ value: 8.2, isPositive: false }}
            variant="destructive"
            delay={0.1}
          />
          <KPICard
            title="Gross Margin"
            value={`${kpiData.grossMargin}%`}
            subtitle="Target: 65%"
            icon={TrendingUp}
            trend={{ value: 3.1, isPositive: true }}
            variant="success"
            delay={0.2}
          />
          <KPICard
            title="Total Transaksi"
            value={kpiData.totalTransactions.toLocaleString()}
            subtitle="Bulan ini"
            icon={Receipt}
            variant="default"
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <RevenueChart />
          <CostCompositionChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <TopProducts />
          <ProfitChart />
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </Layout>
  );
};

export default Index;

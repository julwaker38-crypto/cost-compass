import { Layout } from '@/components/layout/Layout';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { CostCompositionChart } from '@/components/dashboard/CostCompositionChart';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { kpiData } from '@/data/mockData';
import { Wallet, TrendingUp, Receipt, DollarSign } from 'lucide-react';

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Ringkasan keuangan dan analisis HPP bisnis Anda</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart />
          <CostCompositionChart />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopProducts />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

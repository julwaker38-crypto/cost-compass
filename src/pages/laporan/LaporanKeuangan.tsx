import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Percent, Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToExcel } from '@/lib/exportUtils';

const formatCurrency = (v: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);

const monthlyPL = [
  { month: 'Jan', revenue: 15200000, expense: 8500000, profit: 6700000 },
  { month: 'Feb', revenue: 18500000, expense: 9200000, profit: 9300000 },
  { month: 'Mar', revenue: 16800000, expense: 7800000, profit: 9000000 },
  { month: 'Apr', revenue: 21000000, expense: 10500000, profit: 10500000 },
  { month: 'Mei', revenue: 19500000, expense: 9800000, profit: 9700000 },
  { month: 'Jun', revenue: 23000000, expense: 11200000, profit: 11800000 },
];

const totalRevenue = monthlyPL.reduce((s, m) => s + m.revenue, 0);
const totalExpense = monthlyPL.reduce((s, m) => s + m.expense, 0);
const totalProfit = totalRevenue - totalExpense;
const margin = ((totalProfit / totalRevenue) * 100).toFixed(1);

const expenseBreakdown = [
  { category: 'Bahan Baku', amount: 35000000, pct: '61%' },
  { category: 'Tenaga Kerja', amount: 8000000, pct: '14%' },
  { category: 'Overhead', amount: 5000000, pct: '9%' },
  { category: 'Operasional', amount: 6000000, pct: '10%' },
  { category: 'Administrasi', amount: 3000000, pct: '5%' },
];

const LaporanKeuangan = () => {
  const handleExport = (type: 'csv' | 'excel') => {
    const data = monthlyPL.map(d => ({
      Bulan: d.month, Pendapatan: d.revenue, Pengeluaran: d.expense, 'Laba Bersih': d.profit,
    }));
    type === 'csv' ? exportToCSV(data, 'laporan_keuangan') : exportToExcel(data, 'laporan_keuangan');
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Laporan Keuangan</h1>
            <p className="text-muted-foreground">Ringkasan laba rugi dan arus keuangan</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" />Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>Export CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('excel')}>Export Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Pendapatan', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-success' },
            { label: 'Total Pengeluaran', value: formatCurrency(totalExpense), icon: TrendingDown, color: 'text-destructive' },
            { label: 'Laba Bersih', value: formatCurrency(totalProfit), icon: DollarSign, color: 'text-primary' },
            { label: 'Margin', value: `${margin}%`, icon: Percent, color: 'text-accent-foreground' },
          ].map(kpi => (
            <Card key={kpi.label} className="p-4">
              <div className="flex items-center gap-2 mb-1"><kpi.icon className={`w-4 h-4 ${kpi.color}`} /><p className="text-xs text-muted-foreground">{kpi.label}</p></div>
              <p className="text-xl font-bold">{kpi.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Pendapatan vs Pengeluaran</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyPL}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={v => `${(v / 1000000).toFixed(0)}jt`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Legend />
                <Bar dataKey="revenue" name="Pendapatan" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Pengeluaran" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Trend Laba Bersih</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyPL}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={v => `${(v / 1000000).toFixed(0)}jt`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} name="Laba" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Rincian Pengeluaran</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left py-2 text-muted-foreground">Kategori</th><th className="text-right py-2 text-muted-foreground">Jumlah</th><th className="text-right py-2 text-muted-foreground">%</th></tr></thead>
              <tbody>
                {expenseBreakdown.map(e => (
                  <tr key={e.category} className="border-b border-border/50">
                    <td className="py-2">{e.category}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(e.amount)}</td>
                    <td className="py-2 text-right text-muted-foreground">{e.pct}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">{formatCurrency(totalExpense)}</td>
                  <td className="py-2 text-right">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default LaporanKeuangan;

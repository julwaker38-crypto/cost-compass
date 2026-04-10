import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Activity, Search, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface LogEntry {
  id: string;
  user: string;
  role: string;
  action: string;
  detail: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

const LogAktivitas = () => {
  const [logs] = useLocalStorage<LogEntry[]>('costflow_activity_log', [
    { id: '1', user: 'Admin Manager', role: 'manager', action: 'Login', detail: 'Login berhasil', timestamp: '2025-01-20 08:00', type: 'success' },
    { id: '2', user: 'Admin Manager', role: 'manager', action: 'Tambah Produk', detail: 'Menambahkan produk "Nasi Goreng Special"', timestamp: '2025-01-20 08:15', type: 'info' },
    { id: '3', user: 'Kasir 1', role: 'cashier', action: 'Transaksi', detail: 'TRX-001: Rp 50.000', timestamp: '2025-01-20 10:30', type: 'success' },
    { id: '4', user: 'Kasir 1', role: 'cashier', action: 'Pembayaran Gagal', detail: 'TRX-R001: QRIS timeout', timestamp: '2025-01-20 14:30', type: 'error' },
    { id: '5', user: 'Admin Manager', role: 'manager', action: 'Edit Karyawan', detail: 'Mengubah data karyawan "Budi"', timestamp: '2025-01-20 15:00', type: 'info' },
    { id: '6', user: 'Kasir 2', role: 'cashier', action: 'Login', detail: 'Login berhasil', timestamp: '2025-01-20 16:00', type: 'success' },
    { id: '7', user: 'Admin Manager', role: 'manager', action: 'Export Laporan', detail: 'Export Laporan Penjualan ke CSV', timestamp: '2025-01-20 17:00', type: 'info' },
    { id: '8', user: 'Kasir 1', role: 'cashier', action: 'Logout', detail: 'Logout berhasil', timestamp: '2025-01-20 18:00', type: 'warning' },
  ]);
  const [search, setSearch] = useState('');

  const typeColor = (t: string) => t === 'success' ? 'bg-green-500/10 text-green-600' : t === 'error' ? 'bg-destructive/10 text-destructive' : t === 'warning' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary';

  const filtered = logs.filter(l => l.user.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase()) || l.detail.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div><h1 className="text-2xl font-bold text-foreground">Log Aktivitas</h1><p className="text-muted-foreground text-sm">Pantau semua aktivitas pengguna dalam sistem</p></div>

        <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Cari aktivitas..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} /></div>

        <div className="space-y-2">
          {filtered.map(l => (
            <motion.div key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl border border-border/50 p-4 flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColor(l.type)}`}>
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{l.user}</span>
                  <Badge variant="outline" className="text-xs">{l.role}</Badge>
                </div>
                <p className="text-sm font-medium text-foreground mt-0.5">{l.action}</p>
                <p className="text-xs text-muted-foreground">{l.detail}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="w-3 h-3" />{l.timestamp}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-muted-foreground">Tidak ada log aktivitas</div>}
        </div>
      </motion.div>
    </Layout>
  );
};

export default LogAktivitas;

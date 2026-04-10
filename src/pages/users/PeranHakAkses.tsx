import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Shield, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const permissions = [
  { module: 'Dashboard', manager: true, cashier: false },
  { module: 'Kasir / Transaksi', manager: false, cashier: true },
  { module: 'Pesanan Penjualan', manager: false, cashier: true },
  { module: 'Daftar Penjualan', manager: false, cashier: true },
  { module: 'Retur Penjualan', manager: false, cashier: true },
  { module: 'QRIS', manager: false, cashier: true },
  { module: 'Master Produk', manager: true, cashier: false },
  { module: 'Master Kategori', manager: true, cashier: false },
  { module: 'Master Satuan', manager: true, cashier: false },
  { module: 'Master Gudang', manager: true, cashier: false },
  { module: 'Persediaan', manager: true, cashier: false },
  { module: 'Pengeluaran', manager: true, cashier: true },
  { module: 'Karyawan', manager: true, cashier: false },
  { module: 'Analisis', manager: true, cashier: false },
  { module: 'Laporan', manager: true, cashier: false },
  { module: 'Multi Outlet', manager: true, cashier: false },
  { module: 'Manajemen Pengguna', manager: true, cashier: false },
  { module: 'Chat AI', manager: true, cashier: false },
  { module: 'Pengaturan', manager: true, cashier: false },
];

const PeranHakAkses = () => {
  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div><h1 className="text-2xl font-bold text-foreground">Peran & Hak Akses</h1><p className="text-muted-foreground text-sm">Atur peran dan izin akses untuk setiap pengguna</p></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-primary" /><h3 className="font-semibold text-foreground">Manager</h3></div>
            <p className="text-sm text-muted-foreground">Akses penuh ke semua modul kecuali kasir transaksi. Dapat mengelola laporan, analisis, dan pengaturan sistem.</p>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-4">
            <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-accent-foreground" /><h3 className="font-semibold text-foreground">Kasir</h3></div>
            <p className="text-sm text-muted-foreground">Akses terbatas untuk operasional kasir: transaksi, penjualan, dan pengeluaran harian.</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border/50 bg-muted/30"><th className="text-left p-3 text-sm font-medium text-muted-foreground">Modul</th><th className="text-center p-3 text-sm font-medium text-muted-foreground">Manager</th><th className="text-center p-3 text-sm font-medium text-muted-foreground">Kasir</th></tr></thead>
            <tbody>
              {permissions.map(p => (
                <tr key={p.module} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="p-3 text-sm font-medium text-foreground">{p.module}</td>
                  <td className="p-3 text-center">{p.manager ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <X className="w-4 h-4 text-destructive mx-auto" />}</td>
                  <td className="p-3 text-center">{p.cashier ? <Check className="w-4 h-4 text-green-600 mx-auto" /> : <X className="w-4 h-4 text-destructive mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </Layout>
  );
};

export default PeranHakAkses;

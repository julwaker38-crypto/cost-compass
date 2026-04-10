import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Wrench, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Config {
  notifPenjualan: boolean;
  notifStokRendah: boolean;
  batasStokRendah: number;
  formatTanggal: string;
  autoBackup: boolean;
  bahasa: string;
  tema: string;
}

const Konfigurasi = () => {
  const [config, setConfig] = useLocalStorage<Config>('costflow_config', {
    notifPenjualan: true, notifStokRendah: true, batasStokRendah: 10,
    formatTanggal: 'DD/MM/YYYY', autoBackup: false, bahasa: 'id', tema: 'dark',
  });

  const handleSave = () => { toast.success('Konfigurasi disimpan'); };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-foreground">Konfigurasi</h1><p className="text-muted-foreground text-sm">Konfigurasi sistem, notifikasi, dan preferensi</p></div>
          <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Simpan</Button>
        </div>

        <div className="grid gap-6">
          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Notifikasi</h3>
            <div className="flex items-center justify-between"><Label>Notifikasi Penjualan Baru</Label><Switch checked={config.notifPenjualan} onCheckedChange={v => setConfig({ ...config, notifPenjualan: v })} /></div>
            <div className="flex items-center justify-between"><Label>Notifikasi Stok Rendah</Label><Switch checked={config.notifStokRendah} onCheckedChange={v => setConfig({ ...config, notifStokRendah: v })} /></div>
            <div className="flex items-center gap-4"><Label>Batas Stok Rendah</Label><Input type="number" className="w-24" value={config.batasStokRendah} onChange={e => setConfig({ ...config, batasStokRendah: parseInt(e.target.value) || 0 })} /></div>
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Preferensi</h3>
            <div className="flex items-center gap-4">
              <Label className="w-40">Format Tanggal</Label>
              <Select value={config.formatTanggal} onValueChange={v => setConfig({ ...config, formatTanggal: v })}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem><SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem><SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-40">Bahasa</Label>
              <Select value={config.bahasa} onValueChange={v => setConfig({ ...config, bahasa: v })}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="id">Bahasa Indonesia</SelectItem><SelectItem value="en">English</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-40">Tema</Label>
              <Select value={config.tema} onValueChange={v => setConfig({ ...config, tema: v })}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem><SelectItem value="auto">Auto</SelectItem></SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Sistem</h3>
            <div className="flex items-center justify-between"><Label>Auto Backup Harian</Label><Switch checked={config.autoBackup} onCheckedChange={v => setConfig({ ...config, autoBackup: v })} /></div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Konfigurasi;

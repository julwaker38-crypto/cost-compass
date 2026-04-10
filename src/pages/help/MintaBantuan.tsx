import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const MintaBantuan = () => {
  const [form, setForm] = useState({ subject: '', kategori: '', pesan: '' });

  const handleSubmit = () => {
    if (!form.subject || !form.pesan) { toast.error('Lengkapi data'); return; }
    toast.success('Permintaan bantuan terkirim! Tim support akan menghubungi Anda.');
    setForm({ subject: '', kategori: '', pesan: '' });
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div><h1 className="text-2xl font-bold text-foreground">Minta Bantuan</h1><p className="text-muted-foreground text-sm">Hubungi tim support untuk bantuan teknis</p></div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border/50 p-4 flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /><div><p className="text-sm font-medium text-foreground">Email</p><p className="text-xs text-muted-foreground">support@costflow.id</p></div></div>
          <div className="bg-card rounded-xl border border-border/50 p-4 flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /><div><p className="text-sm font-medium text-foreground">Telepon</p><p className="text-xs text-muted-foreground">+62 812 3456 7890</p></div></div>
          <div className="bg-card rounded-xl border border-border/50 p-4 flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /><div><p className="text-sm font-medium text-foreground">Lokasi</p><p className="text-xs text-muted-foreground">Jakarta, Indonesia</p></div></div>
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-6 space-y-4 max-w-2xl">
          <h3 className="font-semibold text-foreground">Kirim Permintaan Bantuan</h3>
          <Input placeholder="Subjek" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
          <Select value={form.kategori} onValueChange={v => setForm({ ...form, kategori: v })}>
            <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="teknis">Masalah Teknis</SelectItem>
              <SelectItem value="akun">Masalah Akun</SelectItem>
              <SelectItem value="fitur">Permintaan Fitur</SelectItem>
              <SelectItem value="lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Jelaskan masalah Anda..." rows={5} value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
          <Button onClick={handleSubmit}><Send className="w-4 h-4 mr-2" />Kirim</Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default MintaBantuan;

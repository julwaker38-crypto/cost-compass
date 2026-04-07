import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Bot, Sparkles, ShoppingCart, TrendingDown, BarChart3, Package, DollarSign, Users, FileText, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, rawMaterials } from '@/data/mockData';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

interface TransactionLog {
  id: string;
  type: 'sale' | 'expense';
  description: string;
  amount: number;
  timestamp: Date;
}

const AIChat = () => {
  const [saleOpen, setSaleOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [saleQty, setSaleQty] = useState('1');
  const [expenseMaterial, setExpenseMaterial] = useState('');
  const [expenseQty, setExpenseQty] = useState('1');
  const [expenseCustomName, setExpenseCustomName] = useState('');
  const [expenseCustomAmount, setExpenseCustomAmount] = useState('');
  const [expenseMode, setExpenseMode] = useState<'material' | 'custom'>('material');
  const [logs, setLogs] = useState<TransactionLog[]>([]);

  const handleSale = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (!product) { toast.error('Pilih produk terlebih dahulu'); return; }
    const qty = parseInt(saleQty) || 1;
    const total = qty * product.sellingPrice;
    const profit = qty * (product.sellingPrice - product.hpp);

    setLogs(prev => [{ id: Date.now().toString(), type: 'sale', description: `${qty}x ${product.name}`, amount: total, timestamp: new Date() }, ...prev]);
    toast.success('Penjualan dicatat!', {
      description: `${qty}x ${product.name} = ${formatCurrency(total)} | Profit: ${formatCurrency(profit)}`,
    });
    setSaleOpen(false);
    setSelectedProduct('');
    setSaleQty('1');
  };

  const handleExpense = () => {
    if (expenseMode === 'material') {
      const material = rawMaterials.find(m => m.id === expenseMaterial);
      if (!material) { toast.error('Pilih bahan terlebih dahulu'); return; }
      const qty = parseInt(expenseQty) || 1;
      const total = qty * material.pricePerUnit;
      setLogs(prev => [{ id: Date.now().toString(), type: 'expense', description: `${qty} ${material.unit} ${material.name}`, amount: total, timestamp: new Date() }, ...prev]);
      toast.success('Pengeluaran dicatat!', { description: `${material.name} = ${formatCurrency(total)}` });
    } else {
      const amount = parseInt(expenseCustomAmount.replace(/[.,]/g, '')) || 0;
      if (!expenseCustomName || !amount) { toast.error('Isi nama dan nominal'); return; }
      setLogs(prev => [{ id: Date.now().toString(), type: 'expense', description: expenseCustomName, amount, timestamp: new Date() }, ...prev]);
      toast.success('Pengeluaran dicatat!', { description: `${expenseCustomName} = ${formatCurrency(amount)}` });
    }
    setExpenseOpen(false);
    setExpenseMaterial('');
    setExpenseQty('1');
    setExpenseCustomName('');
    setExpenseCustomAmount('');
  };

  const totalSales = logs.filter(l => l.type === 'sale').reduce((s, l) => s + l.amount, 0);
  const totalExpenses = logs.filter(l => l.type === 'expense').reduce((s, l) => s + l.amount, 0);

  const quickActions = [
    { icon: ShoppingCart, label: 'Catat Penjualan', description: 'Catat penjualan produk', color: 'from-green-500 to-emerald-600', onClick: () => setSaleOpen(true) },
    { icon: TrendingDown, label: 'Catat Pengeluaran', description: 'Catat pembelian bahan/biaya', color: 'from-red-500 to-rose-600', onClick: () => setExpenseOpen(true) },
    { icon: BarChart3, label: 'Ringkasan Hari Ini', description: 'Lihat total penjualan & pengeluaran', color: 'from-blue-500 to-indigo-600', onClick: () => {
      toast.info(`📊 Ringkasan Hari Ini`, { description: `Penjualan: ${formatCurrency(totalSales)} | Pengeluaran: ${formatCurrency(totalExpenses)} | Saldo: ${formatCurrency(totalSales - totalExpenses)}` });
    }},
    { icon: Package, label: 'Cek Stok', description: 'Lihat stok produk saat ini', color: 'from-purple-500 to-violet-600', onClick: () => {
      toast.info('📦 Stok Produk', { description: products.map(p => `${p.name}: ${p.stockCurrent} ${p.unit}`).join(', ') });
    }},
    { icon: DollarSign, label: 'Harga Produk', description: 'Lihat daftar harga jual', color: 'from-amber-500 to-orange-600', onClick: () => {
      toast.info('💰 Daftar Harga', { description: products.map(p => `${p.name}: ${formatCurrency(p.sellingPrice)}`).join(', ') });
    }},
    { icon: Calculator, label: 'Hitung HPP', description: 'Lihat HPP per produk', color: 'from-teal-500 to-cyan-600', onClick: () => {
      toast.info('📊 HPP Produk', { description: products.map(p => `${p.name}: ${formatCurrency(p.hpp)} (Margin ${p.margin}%)`).join(', ') });
    }},
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Assistant - CostFlow</h1>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Catat transaksi cepat dengan tombol aksi
              </p>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 border-green-500/20 bg-green-500/5">
            <p className="text-sm text-muted-foreground">Total Penjualan Hari Ini</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSales)}</p>
            <p className="text-xs text-muted-foreground">{logs.filter(l => l.type === 'sale').length} transaksi</p>
          </Card>
          <Card className="p-4 border-red-500/20 bg-red-500/5">
            <p className="text-sm text-muted-foreground">Total Pengeluaran Hari Ini</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
            <p className="text-xs text-muted-foreground">{logs.filter(l => l.type === 'expense').length} transaksi</p>
          </Card>
          <Card className="p-4 border-blue-500/20 bg-blue-500/5">
            <p className="text-sm text-muted-foreground">Saldo Bersih</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalSales - totalExpenses)}</p>
          </Card>
        </div>

        {/* Quick Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-semibold mb-3">Aksi Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={action.onClick}
                className="p-4 rounded-xl border border-border/50 bg-card hover:bg-secondary/30 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Transaction Log */}
        {logs.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold mb-3">Riwayat Transaksi Hari Ini</h2>
            <div className="space-y-2">
              {logs.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.type === 'sale' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {log.type === 'sale' ? <ShoppingCart className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{log.description}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <p className={`font-semibold text-sm ${log.type === 'sale' ? 'text-green-600' : 'text-red-600'}`}>
                    {log.type === 'sale' ? '+' : '-'}{formatCurrency(log.amount)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sale Dialog */}
      <Dialog open={saleOpen} onOpenChange={setSaleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Catat Penjualan</DialogTitle>
            <DialogDescription>Pilih produk dan jumlah yang terjual</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Produk</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger><SelectValue placeholder="Pilih produk" /></SelectTrigger>
                <SelectContent>
                  {products.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name} - {formatCurrency(p.sellingPrice)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Jumlah</Label>
              <Input type="number" min="1" value={saleQty} onChange={e => setSaleQty(e.target.value)} />
            </div>
            <Button onClick={handleSale} className="w-full">Catat Penjualan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expense Dialog */}
      <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Catat Pengeluaran</DialogTitle>
            <DialogDescription>Pilih bahan baku atau masukkan pengeluaran manual</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button variant={expenseMode === 'material' ? 'default' : 'outline'} size="sm" onClick={() => setExpenseMode('material')}>Bahan Baku</Button>
              <Button variant={expenseMode === 'custom' ? 'default' : 'outline'} size="sm" onClick={() => setExpenseMode('custom')}>Manual</Button>
            </div>
            {expenseMode === 'material' ? (
              <>
                <div>
                  <Label>Bahan</Label>
                  <Select value={expenseMaterial} onValueChange={setExpenseMaterial}>
                    <SelectTrigger><SelectValue placeholder="Pilih bahan" /></SelectTrigger>
                    <SelectContent>
                      {rawMaterials.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.name} - {formatCurrency(m.pricePerUnit)}/{m.unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Jumlah</Label>
                  <Input type="number" min="1" value={expenseQty} onChange={e => setExpenseQty(e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Nama Pengeluaran</Label>
                  <Input value={expenseCustomName} onChange={e => setExpenseCustomName(e.target.value)} placeholder="Contoh: Bayar listrik" />
                </div>
                <div>
                  <Label>Nominal (Rp)</Label>
                  <Input value={expenseCustomAmount} onChange={e => setExpenseCustomAmount(e.target.value)} placeholder="500000" />
                </div>
              </>
            )}
            <Button onClick={handleExpense} className="w-full">Catat Pengeluaran</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AIChat;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Package, Search, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/mockData';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);

const DaftarProduk = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Daftar Produk Persediaan</h1>
            <p className="text-muted-foreground text-sm">Kelola dan pantau persediaan produk</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setFilterCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterCategory === c ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'}`}>
                {c === 'all' ? 'Semua' : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-sm">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                  </div>
                  <Badge variant={p.stockCurrent < 20 ? 'destructive' : 'secondary'} className="text-[10px]">
                    {p.stockCurrent < 20 ? 'Stok Rendah' : 'Tersedia'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-secondary/30 rounded-lg p-2">
                    <p className="text-muted-foreground">Stok</p>
                    <p className="font-bold text-base">{p.stockCurrent} <span className="text-muted-foreground font-normal text-xs">{p.unit}</span></p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-2">
                    <p className="text-muted-foreground">Harga Jual</p>
                    <p className="font-bold text-sm">{formatCurrency(p.sellingPrice)}</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-2">
                    <p className="text-muted-foreground">HPP</p>
                    <p className="font-bold text-sm">{formatCurrency(p.hpp)}</p>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-2">
                    <p className="text-muted-foreground">Margin</p>
                    <p className="font-bold text-sm text-green-600">{p.margin}%</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DaftarProduk;

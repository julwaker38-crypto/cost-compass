import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Calculator, 
  Users, 
  ShoppingCart,
  TrendingUp,
  Shield,
  Zap,
  Coffee
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Kalkulasi HPP Real-time',
      description: 'Hitung biaya produksi per unit secara otomatis berdasarkan resep dan bahan baku.',
    },
    {
      icon: Users,
      title: 'Manajemen Karyawan',
      description: 'Kelola data karyawan dengan kategorisasi BTKL untuk perhitungan HPP yang akurat.',
    },
    {
      icon: BarChart3,
      title: 'Laporan Keuangan',
      description: 'Dashboard eksekutif dengan analisis laba rugi, margin, dan tren penjualan.',
    },
    {
      icon: ShoppingCart,
      title: 'Sistem POS',
      description: 'Catat transaksi penjualan dengan mudah dan lihat profit secara real-time.',
    },
  ];

  const stats = [
    { value: '70%', label: 'Margin Rata-rata' },
    { value: '500+', label: 'Transaksi/Bulan' },
    { value: 'Rp40M', label: 'Revenue Terkelola' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CostFlow</span>
          </div>
          <Link to="/login">
            <Button variant="outline">Masuk</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sistem Manajemen Bisnis Modern</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Kelola <span className="text-gradient-primary">HPP & Keuangan</span>
              <br />Bisnis Anda dengan Mudah
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Platform manajemen biaya produksi berbasis resep yang membantu Anda 
              memahami ke mana uang Anda pergi — per gram, per unit, per produk.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/login">
                <Button size="lg" className="gap-2 glow-primary">
                  Mulai Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2">
                Lihat Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient-primary number-display">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-card p-2 rounded-2xl glow-primary overflow-hidden"
          >
            <div className="bg-gradient-to-b from-card to-background rounded-xl p-8 min-h-[400px] flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
                {[
                  { label: 'Revenue', value: 'Rp40.4M', icon: TrendingUp, color: 'text-success' },
                  { label: 'Total HPP', value: 'Rp12.1M', icon: Calculator, color: 'text-destructive' },
                  { label: 'Margin', value: '70%', icon: BarChart3, color: 'text-primary' },
                  { label: 'Transaksi', value: '524', icon: ShoppingCart, color: 'text-accent' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="glass-card p-4 text-center"
                  >
                    <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                    <p className="text-2xl font-bold number-display">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola keuangan bisnis dalam satu platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center glow-primary"
          >
            <Shield className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">
              Siap Mengelola Bisnis Anda?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Mulai kelola HPP dan keuangan bisnis Anda dengan sistem yang terstruktur dan mudah dipahami.
            </p>
            <Link to="/login">
              <Button size="lg" className="gap-2">
                Mulai Gratis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-primary" />
            <span className="font-semibold">CostFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 CostFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

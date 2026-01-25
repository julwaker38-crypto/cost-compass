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
  Leaf,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  PieChart,
  LineChart
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
    { value: '70%', label: 'Margin Rata-rata', icon: TrendingUp },
    { value: '500+', label: 'Transaksi/Bulan', icon: ShoppingCart },
    { value: 'Rp40M', label: 'Revenue Terkelola', icon: PieChart },
  ];

  const benefits = [
    'Perhitungan HPP otomatis per produk',
    'Tracking margin keuntungan real-time',
    'Laporan keuangan profesional',
    'Multi-role access (Manager & Cashier)',
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight">CostFlow</span>
                <span className="text-[10px] text-muted-foreground hidden sm:block">Financial Management</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Fitur</a>
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Statistik</a>
              <a href="#cta" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mulai</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-sm hidden sm:inline-flex">
                  Masuk
                </Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                  <span className="hidden sm:inline">Mulai Gratis</span>
                  <span className="sm:hidden">Masuk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Sistem Manajemen Keuangan Modern</span>
            </motion.div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
              Kelola <span className="text-gradient-primary">HPP & Keuangan</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Bisnis Anda
            </h1>
            
            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Platform manajemen biaya produksi berbasis resep yang membantu Anda 
              memahami ke mana uang Anda pergi — per gram, per unit, per produk.
            </p>

            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 h-12 sm:h-11 text-base">
                  Mulai Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 h-12 sm:h-11 text-base border-border/50 hover:bg-card">
                <LineChart className="w-4 h-4" />
                Lihat Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            id="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center glass-card p-3 sm:p-4 md:p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 text-primary" />
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-primary number-display">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-card p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden border border-primary/10"
          >
            <div className="bg-gradient-to-b from-card to-background rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
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
                    className="glass-card p-3 sm:p-4 text-center hover:border-primary/30 transition-all duration-300"
                  >
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2 ${item.color}`} />
                    <p className="text-lg sm:text-xl md:text-2xl font-bold number-display">{item.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <span className="inline-block text-xs sm:text-sm font-medium text-primary mb-2 sm:mb-3 uppercase tracking-wider">Fitur Unggulan</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Kelola keuangan bisnis dalam satu platform terintegrasi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-5 sm:p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 md:p-12 text-center relative overflow-hidden border border-primary/20"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                Siap Mengelola Bisnis Anda?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
                Mulai kelola HPP dan keuangan bisnis Anda dengan sistem yang terstruktur dan mudah dipahami.
              </p>
              <Link to="/login">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 h-12 text-base">
                  Mulai Gratis Sekarang
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-t border-border/50 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">CostFlow</span>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Fitur</a>
              <a href="#" className="hover:text-foreground transition-colors">Tentang</a>
              <a href="#" className="hover:text-foreground transition-colors">Kontak</a>
            </nav>

            {/* Copyright */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2025 CostFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

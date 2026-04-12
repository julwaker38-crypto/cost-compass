import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, User, Lock, LogIn, ArrowLeft, UserCircle, Building2, MapPin, Phone, Calendar, ChevronRight, ChevronLeft, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth, UserRole, AuthUser } from '@/hooks/useAuth';

const businessTypes = [
  'Restoran / Kafe',
  'Toko Roti & Kue',
  'Catering',
  'Food Truck',
  'Minuman & Jus',
  'Lainnya',
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [regStep, setRegStep] = useState(1); // 1 = account info, 2 = business info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'cashier' as UserRole,
  });
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessType: '',
    address: '',
    phone: '',
    foundingDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    // Validate step 1
    if (!formData.name.trim()) {
      toast.error('Nama lengkap wajib diisi');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Email wajib diisi');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password tidak cocok');
      return;
    }

    const users = JSON.parse(localStorage.getItem('costflow_users') || '[]');
    const existingUser = users.find((u: AuthUser) => u.email === formData.email);
    if (existingUser) {
      toast.error('Email sudah terdaftar');
      return;
    }

    setRegStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('costflow_users') || '[]');
      const user = users.find((u: AuthUser & { password: string }) =>
        u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const authUser: AuthUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        login(authUser);
        toast.success(`Selamat datang, ${user.name}!`);
        navigate(user.role === 'cashier' ? '/transactions' : '/laporan/penjualan');
      } else {
        toast.error('Email atau password salah');
      }
    } else {
      // Step 2 validation
      if (!businessData.businessName.trim()) {
        toast.error('Nama perusahaan wajib diisi');
        setIsLoading(false);
        return;
      }
      if (!businessData.businessType) {
        toast.error('Jenis usaha wajib dipilih');
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem('costflow_users') || '[]');

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      users.push(newUser);
      localStorage.setItem('costflow_users', JSON.stringify(users));

      // Save business data linked to user
      const businessInfo = {
        ...businessData,
        userId: newUser.id,
        initialCapital: 0,
        capitalSource: '',
      };
      localStorage.setItem('costflow_business', JSON.stringify(businessInfo));

      const authUser: AuthUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
      login(authUser);

      toast.success('Registrasi berhasil!');
      navigate(newUser.role === 'cashier' ? '/transactions' : '/laporan/penjualan');
    }

    setIsLoading(false);
  };

  const resetToLogin = () => {
    setIsLogin(true);
    setRegStep(1);
  };

  const resetToRegister = () => {
    setIsLogin(false);
    setRegStep(1);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 to-accent/10 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">CostFlow</span>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Kelola Bisnis
            <br />
            <span className="text-gradient-primary">Lebih Efisien</span>
          </h1>
          <p className="text-muted-foreground max-w-md">
            Sistem manajemen HPP dan keuangan bisnis dengan kalkulasi biaya per unit yang akurat.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-muted-foreground">
            © 2025 CostFlow. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Link to="/">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
            </Link>
            <span className="text-xl font-bold">CostFlow</span>
          </div>

          <div className="glass-card p-8">
            {/* Step indicator for registration */}
            {!isLogin && (
              <div className="flex items-center gap-2 mb-6">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  regStep === 1 ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  <UserCircle className="w-3.5 h-3.5" />
                  Akun
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  regStep === 2 ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  <Building2 className="w-3.5 h-3.5" />
                  Perusahaan
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? 'Masuk ke Akun' : regStep === 1 ? 'Buat Akun Baru' : 'Info Perusahaan'}
              </h2>
              <p className="text-muted-foreground text-sm">
                {isLogin
                  ? 'Masukkan email dan password Anda'
                  : regStep === 1
                    ? 'Isi data akun untuk mulai mengelola bisnis'
                    : 'Lengkapi informasi perusahaan Anda'}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="nama@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Masukkan password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        Masuk
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : regStep === 1 ? (
                <motion.div
                  key="reg-step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Masukkan nama lengkap"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="nama@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Minimal 6 karakter"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Konfirmasi Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Ulangi password"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Role / Jabatan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, role: 'manager' }))}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          formData.role === 'manager'
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary hover:border-primary/50'
                        }`}
                      >
                        <UserCircle className={`w-6 h-6 mx-auto mb-2 ${formData.role === 'manager' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className="font-medium text-sm">Manager</p>
                        <p className="text-xs text-muted-foreground mt-1">Akses penuh</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, role: 'cashier' }))}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          formData.role === 'cashier'
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary hover:border-primary/50'
                        }`}
                      >
                        <UserCircle className={`w-6 h-6 mx-auto mb-2 ${formData.role === 'cashier' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className="font-medium text-sm">Cashier</p>
                        <p className="text-xs text-muted-foreground mt-1">Transaksi & produk</p>
                      </button>
                    </div>
                  </div>

                  <Button type="button" className="w-full gap-2" size="lg" onClick={handleNextStep}>
                    Lanjut
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="reg-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Nama Perusahaan *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={businessData.businessName}
                        onChange={(e) => setBusinessData(prev => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Contoh: Kedai Kopi Nusantara"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Jenis Usaha *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {businessTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setBusinessData(prev => ({ ...prev, businessType: type }))}
                          className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                            businessData.businessType === type
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-secondary text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Alamat</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={businessData.address}
                        onChange={(e) => setBusinessData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Alamat usaha"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">No. Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={businessData.phone}
                          onChange={(e) => setBusinessData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="08xx"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Tanggal Berdiri</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={businessData.foundingDate}
                          onChange={(e) => setBusinessData(prev => ({ ...prev, foundingDate: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => setRegStep(1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Kembali
                    </Button>
                    <Button type="submit" className="flex-1 gap-2" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          Daftar & Mulai
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <button
                onClick={() => isLogin ? resetToRegister() : resetToLogin()}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin
                  ? 'Belum punya akun? Daftar sekarang'
                  : 'Sudah punya akun? Masuk'}
              </button>
            </div>

            {/* Template Accounts */}
            {isLogin && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Akun Template (klik untuk login otomatis)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      login({
                        id: 'template-manager',
                        name: 'Admin Manager',
                        email: 'admin@costflow.com',
                        role: 'manager',
                      });
                      toast.success('Login sebagai Manager');
                      navigate('/laporan/penjualan');
                    }}
                  >
                    🔑 Manager
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      login({
                        id: 'template-cashier',
                        name: 'Kasir CostFlow',
                        email: 'kasir@costflow.com',
                        role: 'cashier',
                      });
                      toast.success('Login sebagai Cashier');
                      navigate('/transactions');
                    }}
                  >
                    🔑 Cashier
                  </Button>
                </div>
                <div className="mt-3 text-[10px] text-muted-foreground text-center space-y-0.5">
                  <p>Manager: admin@costflow.com / admin123</p>
                  <p>Cashier: kasir@costflow.com / kasir123</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

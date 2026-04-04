import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Coffee, User, Lock, LogIn, ArrowLeft, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth, UserRole, AuthUser } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'cashier' as UserRole,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isLogin) {
      // Login logic
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
        navigate('/dashboard');
      } else {
        toast.error('Email atau password salah');
      }
    } else {
      // Register logic
      if (formData.password !== formData.confirmPassword) {
        toast.error('Password tidak cocok');
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password minimal 6 karakter');
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem('costflow_users') || '[]');
      const existingUser = users.find((u: AuthUser) => u.email === formData.email);

      if (existingUser) {
        toast.error('Email sudah terdaftar');
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      users.push(newUser);
      localStorage.setItem('costflow_users', JSON.stringify(users));

      const authUser: AuthUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };
      localStorage.setItem('costflow_auth', JSON.stringify(authUser));
      
      toast.success('Registrasi berhasil!');
      navigate('/dashboard');
    }

    setIsLoading(false);
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
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? 'Masuk ke Akun' : 'Buat Akun Baru'}
              </h2>
              <p className="text-muted-foreground text-sm">
                {isLogin 
                  ? 'Masukkan email dan password Anda' 
                  : 'Daftar untuk mulai mengelola bisnis'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Masukkan nama lengkap"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Email
                </label>
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
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Password
                </label>
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

              {!isLogin && (
                <>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Ulangi password"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                      Role / Jabatan
                    </label>
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
                        <UserCircle className={`w-6 h-6 mx-auto mb-2 ${
                          formData.role === 'manager' ? 'text-primary' : 'text-muted-foreground'
                        }`} />
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
                        <UserCircle className={`w-6 h-6 mx-auto mb-2 ${
                          formData.role === 'cashier' ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <p className="font-medium text-sm">Cashier</p>
                        <p className="text-xs text-muted-foreground mt-1">Transaksi & produk</p>
                      </button>
                    </div>
                  </div>
                </>
              )}

              <Button 
                type="submit" 
                className="w-full gap-2" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    {isLogin ? 'Masuk' : 'Daftar'}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin 
                  ? 'Belum punya akun? Daftar sekarang' 
                  : 'Sudah punya akun? Masuk'}
              </button>
            </div>

            {/* Demo Accounts */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center mb-3">
                Demo Akun (klik untuk login otomatis)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    const demoManager = {
                      id: 'demo-manager',
                      name: 'Demo Manager',
                      email: 'manager@demo.com',
                      role: 'manager' as UserRole,
                    };
                    localStorage.setItem('costflow_auth', JSON.stringify(demoManager));
                    toast.success('Login sebagai Manager');
                    navigate('/dashboard');
                  }}
                >
                  Login Manager
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    const demoCashier = {
                      id: 'demo-cashier',
                      name: 'Demo Cashier',
                      email: 'cashier@demo.com',
                      role: 'cashier' as UserRole,
                    };
                    localStorage.setItem('costflow_auth', JSON.stringify(demoCashier));
                    toast.success('Login sebagai Cashier');
                    navigate('/dashboard');
                  }}
                >
                  Login Cashier
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

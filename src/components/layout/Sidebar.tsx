import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  TrendingDown,
  Users,
  Leaf,
  Database,
  Tag,
  Ruler,
  Warehouse,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  UserCog,
  Shield,
  Activity,
  Building2,
  Wrench,
  HelpCircle,
  MessageCircle,
  History,
  LogOut
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth, UserRole } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface NavGroup {
  id: string;
  icon: React.ElementType;
  label: string;
  roles: UserRole[];
  items?: NavItem[];
  path?: string; // for single items without sub-menu
}

const navGroups: NavGroup[] = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    path: '/dashboard', 
    roles: ['manager', 'cashier'] 
  },
  { 
    id: 'transactions',
    icon: Receipt, 
    label: 'Transaksi', 
    path: '/transactions', 
    roles: ['cashier'] 
  },
  {
    id: 'master-data',
    icon: Database,
    label: 'Master Data',
    roles: ['manager'],
    items: [
      { icon: Package, label: 'Master Produk', path: '/products' },
      { icon: Tag, label: 'Master Kategori', path: '/master/kategori' },
      { icon: Ruler, label: 'Master Satuan', path: '/master/satuan' },
      { icon: Warehouse, label: 'Master Gudang', path: '/master/gudang' },
    ]
  },
  { 
    id: 'expenses',
    icon: TrendingDown, 
    label: 'Pengeluaran', 
    path: '/expenses', 
    roles: ['manager', 'cashier'] 
  },
  { 
    id: 'employees',
    icon: Users, 
    label: 'Karyawan', 
    path: '/employees', 
    roles: ['manager'] 
  },
  {
    id: 'analisis',
    icon: TrendingUp,
    label: 'Analisis',
    roles: ['manager'],
    items: [
      { icon: BarChart3, label: 'Analisis Pareto', path: '/analisis/pareto' },
      { icon: ShoppingCart, label: 'Analisis Pembelian', path: '/analisis/pembelian' },
      { icon: DollarSign, label: 'Analisis Harga', path: '/analisis/harga' },
    ]
  },
  {
    id: 'user-management',
    icon: UserCog,
    label: 'Manajemen Pengguna',
    roles: ['manager'],
    items: [
      { icon: Users, label: 'Daftar Pengguna', path: '/users' },
      { icon: Shield, label: 'Peran & Hak Akses', path: '/users/roles' },
      { icon: Activity, label: 'Log Aktivitas', path: '/users/log' },
    ]
  },
  { 
    id: 'ai-chat',
    icon: MessageSquare, 
    label: 'Chat AI', 
    path: '/chat', 
    roles: ['manager'] 
  },
  { 
    id: 'reports',
    icon: BarChart3, 
    label: 'Laporan', 
    path: '/reports', 
    roles: ['manager'] 
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Pengaturan',
    roles: ['manager'],
    items: [
      { icon: Building2, label: 'Profil Bisnis', path: '/settings' },
      { icon: Wrench, label: 'Konfigurasi', path: '/settings/config' },
    ]
  },
  {
    id: 'help',
    icon: HelpCircle,
    label: 'Pusat Bantuan',
    roles: ['manager'],
    items: [
      { icon: MessageCircle, label: 'Minta Bantuan', path: '/help/request' },
      { icon: History, label: 'Riwayat Update', path: '/help/updates' },
    ]
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userRole = user?.role || 'cashier';
  const filteredGroups = navGroups.filter(group => group.roles.includes(userRole));
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-card/30 backdrop-blur-xl border-r border-border/30 z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border/30">
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-bold text-foreground tracking-tight">CostFlow</h1>
                <p className="text-[10px] text-muted-foreground">MBG Vendor System</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {!isCollapsed && (
          <p className="px-3 mb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
            Menu
          </p>
        )}
        {filteredGroups.map((group) => {
          // Single item (no sub-menu)
          if (group.path) {
            return (
              <NavLink
                key={group.id}
                to={group.path}
                end={group.path === '/dashboard'}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-200 group"
                activeClassName="bg-primary/10 text-foreground border border-primary/15"
              >
                <group.icon className="w-5 h-5 flex-shrink-0 group-hover:text-primary transition-colors" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-medium"
                    >
                      {group.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          }

          // Collapsible group
          const isOpen = openGroups[group.id] || false;
          return (
            <div key={group.id}>
              <button
                onClick={() => isCollapsed ? undefined : toggleGroup(group.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-200 group"
              >
                <group.icon className="w-5 h-5 flex-shrink-0 group-hover:text-primary transition-colors" />
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">{group.label}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </>
                )}
              </button>
              <AnimatePresence>
                {isOpen && !isCollapsed && group.items && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-4 border-l border-border/30 space-y-0.5 py-1">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-200 text-sm"
                          activeClassName="bg-primary/10 text-foreground"
                        >
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Logout & Toggle */}
      <div className="p-3 border-t border-border/30 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

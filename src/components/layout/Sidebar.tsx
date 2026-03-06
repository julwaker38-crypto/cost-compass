import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  TrendingDown,
  Users,
  Leaf
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth, UserRole } from '@/hooks/useAuth';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: UserRole[]; // which roles can see this item
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['manager', 'cashier'] },
  { icon: Package, label: 'Produk', path: '/products', roles: ['manager'] },
  { icon: TrendingDown, label: 'Pengeluaran', path: '/expenses', roles: ['manager', 'cashier'] },
  { icon: Users, label: 'Karyawan', path: '/employees', roles: ['manager'] },
  { icon: Receipt, label: 'Transaksi', path: '/transactions', roles: ['cashier'] },
  { icon: MessageSquare, label: 'Chat AI', path: '/chat', roles: ['manager'] },
  { icon: BarChart3, label: 'Laporan', path: '/reports', roles: ['manager'] },
  { icon: Settings, label: 'Pengaturan', path: '/settings', roles: ['manager'] },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { user } = useAuth();
  const userRole = user?.role || 'cashier';
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

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
                <p className="text-[10px] text-muted-foreground">HPP Manager</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className="px-3 mb-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">
            Menu
          </p>
        )}
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-all duration-200 group"
            activeClassName="bg-primary/10 text-foreground border border-primary/15"
          >
            <item.icon className="w-5 h-5 flex-shrink-0 group-hover:text-primary transition-colors" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t border-border/30">
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

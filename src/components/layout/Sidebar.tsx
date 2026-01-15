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
  Wallet,
  MessageSquare,
  TrendingDown
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Produk', path: '/products' },
  { icon: TrendingDown, label: 'Pengeluaran', path: '/expenses' },
  { icon: Receipt, label: 'Transaksi', path: '/transactions' },
  { icon: MessageSquare, label: 'Chat AI', path: '/chat' },
  { icon: BarChart3, label: 'Laporan', path: '/reports' },
  { icon: Settings, label: 'Pengaturan', path: '/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <motion.div 
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Wallet className="w-5 h-5 text-primary-foreground" />
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
                <p className="text-xs text-muted-foreground">HPP Manager</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200 group"
            activeClassName="bg-sidebar-accent text-foreground"
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
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { products } from '@/data/mockData';
import { Link } from 'react-router-dom';

export const TopProducts = () => {
  const sortedProducts = [...products].sort((a, b) => b.margin - a.margin);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Produk Terlaris</h3>
          <p className="text-sm text-muted-foreground">Berdasarkan margin</p>
        </div>
        <Link 
          to="/products" 
          className="text-sm text-primary hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-4">
        {sortedProducts.slice(0, 4).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">
              {product.emoji}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate group-hover:text-primary transition-colors">
                {product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {product.salesCount} terjual
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm font-semibold number-display">{product.margin.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-muted-foreground">margin</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

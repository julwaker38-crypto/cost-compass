import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Plus } from 'lucide-react';
import { products as initialProducts, rawMaterials, Product } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AddProductForm } from './AddProductForm';

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdding, setIsAdding] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produk</h1>
          <p className="text-muted-foreground">Kelola produk dan lihat analisis HPP</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      {/* Add Product Form */}
      <AnimatePresence>
        {isAdding && (
          <AddProductForm
            rawMaterials={rawMaterials}
            onAddProduct={handleAddProduct}
            onClose={() => setIsAdding(false)}
          />
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={`/product/${product.id}`}
              className="glass-card p-5 flex items-center gap-5 hover:border-primary/30 transition-all duration-300 group block"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {product.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.salesCount} terjual
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Harga Jual</p>
                  <p className="font-semibold number-display">{formatCurrency(product.sellingPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">HPP</p>
                  <p className="font-semibold number-display text-destructive">{formatCurrency(product.hpp)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Margin</p>
                  <div className="flex items-center justify-center gap-1 text-success">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-semibold number-display">{product.margin}%</span>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

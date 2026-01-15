export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  pricePerUnit: number;
  totalCost: number;
  category: 'raw' | 'packaging' | 'other';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  emoji: string;
  sellingPrice: number;
  hpp: number;
  margin: number;
  ingredients: Ingredient[];
  laborCost: number;
  overheadCost: number;
  salesCount: number;
  stockInitial: number;
  stockCurrent: number;
  unit: string;
  description: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: string;
  category: 'bahan_baku' | 'tenaga_kerja' | 'overhead' | 'operasional' | 'administrasi';
  description: string;
  stockCurrent: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  productId?: string;
  materialId?: string;
  isHpp: boolean;
}

export interface BusinessData {
  name: string;
  type: string;
  address: string;
  phone: string;
  foundingDate: string;
  initialCapital: number;
  capitalSource: string;
}

export interface DailyData {
  date: string;
  revenue: number;
  hpp: number;
  profit: number;
}

export const businessData: BusinessData = {
  name: 'CostFlow Coffee',
  type: 'Kuliner',
  address: 'Jl. Sudirman No. 123, Jakarta',
  phone: '021-1234567',
  foundingDate: '2024-01-01',
  initialCapital: 50000000,
  capitalSource: 'Investasi Pribadi',
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Kopi Susu Gula Aren',
    category: 'Coffee',
    emoji: '☕',
    sellingPrice: 25000,
    hpp: 6700,
    margin: 73.2,
    salesCount: 156,
    laborCost: 1000,
    overheadCost: 500,
    stockInitial: 100,
    stockCurrent: 85,
    unit: 'Cup',
    description: 'Kopi susu dengan gula aren asli',
    ingredients: [
      { id: '1', name: 'Biji Kopi Arabica', amount: 10, unit: 'g', pricePerUnit: 150, totalCost: 1500, category: 'raw' },
      { id: '2', name: 'Creamer', amount: 15, unit: 'g', pricePerUnit: 100, totalCost: 1500, category: 'raw' },
      { id: '3', name: 'Susu UHT', amount: 100, unit: 'ml', pricePerUnit: 18, totalCost: 1800, category: 'raw' },
      { id: '4', name: 'Gula Aren', amount: 20, unit: 'g', pricePerUnit: 20, totalCost: 400, category: 'raw' },
    ],
  },
  {
    id: '2',
    name: 'Matcha Latte',
    category: 'Non-Coffee',
    emoji: '🍵',
    sellingPrice: 28000,
    hpp: 8200,
    margin: 70.7,
    salesCount: 89,
    laborCost: 1000,
    overheadCost: 500,
    stockInitial: 80,
    stockCurrent: 65,
    unit: 'Cup',
    description: 'Matcha premium dengan susu segar',
    ingredients: [
      { id: '1', name: 'Matcha Powder', amount: 8, unit: 'g', pricePerUnit: 500, totalCost: 4000, category: 'raw' },
      { id: '2', name: 'Susu UHT', amount: 150, unit: 'ml', pricePerUnit: 18, totalCost: 2700, category: 'raw' },
    ],
  },
  {
    id: '3',
    name: 'Es Teh Manis',
    category: 'Tea',
    emoji: '🧋',
    sellingPrice: 12000,
    hpp: 2800,
    margin: 76.7,
    salesCount: 234,
    laborCost: 500,
    overheadCost: 300,
    stockInitial: 200,
    stockCurrent: 180,
    unit: 'Cup',
    description: 'Teh manis segar dengan es',
    ingredients: [
      { id: '1', name: 'Teh Celup', amount: 2, unit: 'pcs', pricePerUnit: 500, totalCost: 1000, category: 'raw' },
      { id: '2', name: 'Gula Pasir', amount: 30, unit: 'g', pricePerUnit: 15, totalCost: 450, category: 'raw' },
      { id: '3', name: 'Es Batu', amount: 50, unit: 'g', pricePerUnit: 7, totalCost: 350, category: 'raw' },
    ],
  },
  {
    id: '4',
    name: 'Croissant',
    category: 'Pastry',
    emoji: '🥐',
    sellingPrice: 35000,
    hpp: 12000,
    margin: 65.7,
    salesCount: 45,
    laborCost: 3000,
    overheadCost: 1500,
    stockInitial: 50,
    stockCurrent: 42,
    unit: 'Pcs',
    description: 'Croissant butter premium',
    ingredients: [
      { id: '1', name: 'Tepung Terigu', amount: 80, unit: 'g', pricePerUnit: 15, totalCost: 1200, category: 'raw' },
      { id: '2', name: 'Butter', amount: 40, unit: 'g', pricePerUnit: 120, totalCost: 4800, category: 'raw' },
      { id: '3', name: 'Telur', amount: 1, unit: 'pcs', pricePerUnit: 2500, totalCost: 2500, category: 'raw' },
    ],
  },
];

export const rawMaterials: RawMaterial[] = [
  { id: '1', name: 'Biji Kopi Arabica', pricePerUnit: 150000, unit: 'Kg', category: 'bahan_baku', description: 'Kopi arabica grade A', stockCurrent: 25 },
  { id: '2', name: 'Susu UHT', pricePerUnit: 18000, unit: 'Liter', category: 'bahan_baku', description: 'Susu UHT full cream', stockCurrent: 50 },
  { id: '3', name: 'Gula Aren', pricePerUnit: 20000, unit: 'Kg', category: 'bahan_baku', description: 'Gula aren murni', stockCurrent: 15 },
  { id: '4', name: 'Gaji Barista', pricePerUnit: 150000, unit: 'Hari', category: 'tenaga_kerja', description: 'Gaji barista per hari', stockCurrent: 0 },
  { id: '5', name: 'Listrik', pricePerUnit: 500000, unit: 'Bulan', category: 'overhead', description: 'Biaya listrik bulanan', stockCurrent: 0 },
  { id: '6', name: 'Sewa Tempat', pricePerUnit: 5000000, unit: 'Bulan', category: 'operasional', description: 'Sewa lokasi usaha', stockCurrent: 0 },
];

export const transactions: Transaction[] = [
  { id: '1', date: '2025-01-15', type: 'income', category: 'Penjualan', description: 'Kopi Susu Gula Aren', quantity: 15, unitPrice: 25000, total: 375000, productId: '1', isHpp: false },
  { id: '2', date: '2025-01-15', type: 'income', category: 'Penjualan', description: 'Matcha Latte', quantity: 8, unitPrice: 28000, total: 224000, productId: '2', isHpp: false },
  { id: '3', date: '2025-01-15', type: 'expense', category: 'Bahan Baku', description: 'Beli Biji Kopi 5kg', quantity: 5, unitPrice: 150000, total: 750000, materialId: '1', isHpp: true },
  { id: '4', date: '2025-01-14', type: 'income', category: 'Penjualan', description: 'Es Teh Manis', quantity: 20, unitPrice: 12000, total: 240000, productId: '3', isHpp: false },
  { id: '5', date: '2025-01-14', type: 'expense', category: 'Tenaga Kerja', description: 'Gaji Barista', quantity: 1, unitPrice: 150000, total: 150000, materialId: '4', isHpp: true },
  { id: '6', date: '2025-01-13', type: 'expense', category: 'Operasional', description: 'Listrik Bulan Ini', quantity: 1, unitPrice: 500000, total: 500000, materialId: '5', isHpp: false },
];

export const dailyData: DailyData[] = [
  { date: '01 Jan', revenue: 4500000, hpp: 1350000, profit: 3150000 },
  { date: '02 Jan', revenue: 5200000, hpp: 1560000, profit: 3640000 },
  { date: '03 Jan', revenue: 4800000, hpp: 1440000, profit: 3360000 },
  { date: '04 Jan', revenue: 6100000, hpp: 1830000, profit: 4270000 },
  { date: '05 Jan', revenue: 5800000, hpp: 1740000, profit: 4060000 },
  { date: '06 Jan', revenue: 7200000, hpp: 2160000, profit: 5040000 },
  { date: '07 Jan', revenue: 6800000, hpp: 2040000, profit: 4760000 },
];

export const kpiData = {
  totalRevenue: 40400000,
  totalHpp: 12120000,
  grossMargin: 70,
  avgCostPerUnit: 6500,
  totalTransactions: 524,
  topProduct: 'Es Teh Manis',
  totalExpenseOperasional: 5500000,
  netProfit: 22780000,
};

export const costComposition = [
  { name: 'Bahan Baku', value: 78, color: 'hsl(var(--primary))' },
  { name: 'Tenaga Kerja', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Overhead', value: 7, color: 'hsl(var(--warning))' },
];

export const hppBreakdown = [
  { category: 'Bahan Baku', amount: 9453600, percentage: 78 },
  { category: 'Tenaga Kerja Langsung', amount: 1818000, percentage: 15 },
  { category: 'Overhead Produksi', amount: 848400, percentage: 7 },
];

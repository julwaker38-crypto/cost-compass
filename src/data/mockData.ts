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
}

export interface DailyData {
  date: string;
  revenue: number;
  hpp: number;
  profit: number;
}

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
    ingredients: [
      { id: '1', name: 'Tepung Terigu', amount: 80, unit: 'g', pricePerUnit: 15, totalCost: 1200, category: 'raw' },
      { id: '2', name: 'Butter', amount: 40, unit: 'g', pricePerUnit: 120, totalCost: 4800, category: 'raw' },
      { id: '3', name: 'Telur', amount: 1, unit: 'pcs', pricePerUnit: 2500, totalCost: 2500, category: 'raw' },
    ],
  },
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
};

export const costComposition = [
  { name: 'Bahan Baku', value: 78, color: 'hsl(var(--primary))' },
  { name: 'Tenaga Kerja', value: 15, color: 'hsl(var(--accent))' },
  { name: 'Overhead', value: 7, color: 'hsl(var(--warning))' },
];

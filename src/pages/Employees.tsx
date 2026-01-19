import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Plus, Trash2, Users, X, Check, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export interface Employee {
  id: string;
  name: string;
  position: string;
  dailyWage: number;
  monthlyWage: number;
  wageType: 'daily' | 'monthly';
  isProductionLabor: boolean; // BTKL flag
  department: string;
  phone: string;
  joinDate: string;
}

const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'Ahmad Barista',
    position: 'Barista',
    dailyWage: 150000,
    monthlyWage: 3900000,
    wageType: 'daily',
    isProductionLabor: true,
    department: 'Produksi',
    phone: '081234567890',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Siti Kasir',
    position: 'Kasir',
    dailyWage: 120000,
    monthlyWage: 3120000,
    wageType: 'daily',
    isProductionLabor: false,
    department: 'Operasional',
    phone: '081234567891',
    joinDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Budi Chef',
    position: 'Chef Pastry',
    dailyWage: 200000,
    monthlyWage: 5200000,
    wageType: 'daily',
    isProductionLabor: true,
    department: 'Produksi',
    phone: '081234567892',
    joinDate: '2024-01-20',
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    dailyWage: 0,
    monthlyWage: 0,
    wageType: 'daily' as 'daily' | 'monthly',
    isProductionLabor: true,
    department: 'Produksi',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const departments = ['Produksi', 'Operasional', 'Administrasi', 'Marketing'];
  const positions = ['Barista', 'Chef', 'Chef Pastry', 'Kasir', 'Waiter', 'Cleaning Service', 'Manager', 'Admin'];

  const handleAdd = () => {
    if (!formData.name || !formData.position) {
      toast.error('Mohon isi nama dan posisi dengan benar');
      return;
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...formData,
    };

    setEmployees(prev => [...prev, newEmployee]);
    setFormData({
      name: '',
      position: '',
      dailyWage: 0,
      monthlyWage: 0,
      wageType: 'daily',
      isProductionLabor: true,
      department: 'Produksi',
      phone: '',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setIsAdding(false);
    toast.success('Karyawan berhasil ditambahkan!');
  };

  const handleDelete = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    toast.success('Karyawan berhasil dihapus');
  };

  const btklEmployees = employees.filter(e => e.isProductionLabor);
  const nonBtklEmployees = employees.filter(e => !e.isProductionLabor);
  const totalBtklDaily = btklEmployees.reduce((sum, e) => sum + e.dailyWage, 0);
  const totalNonBtklDaily = nonBtklEmployees.reduce((sum, e) => sum + e.dailyWage, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold mb-1">Kelola Karyawan</h1>
            <p className="text-muted-foreground">
              Kelola data karyawan dan tentukan kategori BTKL (Biaya Tenaga Kerja Langsung)
            </p>
          </div>
          <Button onClick={() => setIsAdding(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Karyawan
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Karyawan</p>
                <p className="text-xl font-bold">{employees.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-4 border-l-4 border-l-success"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BTKL (Produksi)</p>
                <p className="text-xl font-bold">{btklEmployees.length} orang</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(totalBtklDaily)}/hari</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 border-l-4 border-l-warning"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Non-BTKL (Operasional)</p>
                <p className="text-xl font-bold">{nonBtklEmployees.length} orang</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(totalNonBtklDaily)}/hari</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BTKL Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-4 border-l-4 border-l-primary"
        >
          <h3 className="font-semibold text-primary mb-2">
            👷 Apa itu BTKL (Biaya Tenaga Kerja Langsung)?
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            BTKL adalah biaya tenaga kerja yang langsung terlibat dalam proses produksi barang/jasa. 
            Biaya ini termasuk dalam perhitungan HPP (Harga Pokok Penjualan).
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Termasuk BTKL:</strong> Barista, Chef, Baker, Operator mesin produksi</li>
            <li><strong>Tidak termasuk BTKL:</strong> Kasir, Admin, Security, Cleaning Service</li>
          </ul>
        </motion.div>

        {/* Add Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Tambah Karyawan Baru</h3>
                <button onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Nama Karyawan
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Posisi/Jabatan
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
                  >
                    <option value="">Pilih Posisi</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Gaji Harian (IDR)
                  </label>
                  <Input
                    type="number"
                    value={formData.dailyWage || ''}
                    onChange={(e) => {
                      const daily = parseInt(e.target.value) || 0;
                      setFormData(prev => ({ 
                        ...prev, 
                        dailyWage: daily,
                        monthlyWage: daily * 26 // 26 hari kerja per bulan
                      }));
                    }}
                    placeholder="Masukkan gaji harian"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Estimasi Gaji Bulanan
                  </label>
                  <div className="px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-muted-foreground">
                    {formatCurrency(formData.dailyWage * 26)} (26 hari kerja)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Departemen
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Kategori Biaya
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="laborType"
                        checked={formData.isProductionLabor}
                        onChange={() => setFormData(prev => ({ ...prev, isProductionLabor: true }))}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">BTKL (Produksi)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="laborType"
                        checked={!formData.isProductionLabor}
                        onChange={() => setFormData(prev => ({ ...prev, isProductionLabor: false }))}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Operasional</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    No. Telepon
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="081234567890"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                    Tanggal Bergabung
                  </label>
                  <Input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, joinDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAdd} className="gap-2">
                  <Check className="w-4 h-4" />
                  Simpan Karyawan
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Batal
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Employees List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Daftar Karyawan</h3>
          </div>

          {employees.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">Belum ada data karyawan</p>
              <p className="text-sm text-muted-foreground">
                Silakan tambah karyawan untuk mulai mengelola BTKL.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nama</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Posisi</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Departemen</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Gaji/Hari</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Gaji/Bulan</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Kategori</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Telepon</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-t border-border hover:bg-secondary/30"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                            {employee.name.charAt(0)}
                          </div>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{employee.position}</td>
                      <td className="py-3 px-4 text-muted-foreground">{employee.department}</td>
                      <td className="py-3 px-4 text-right number-display">
                        {formatCurrency(employee.dailyWage)}
                      </td>
                      <td className="py-3 px-4 text-right number-display">
                        {formatCurrency(employee.monthlyWage)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {employee.isProductionLabor ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                            BTKL
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                            Operasional
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {employee.phone || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Employees;

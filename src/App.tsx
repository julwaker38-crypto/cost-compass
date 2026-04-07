import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Transactions from "./pages/Transactions";
import AIChat from "./pages/AIChat";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Expenses from "./pages/Expenses";
import Employees from "./pages/Employees";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import MasterKategori from "./pages/MasterKategori";
import MasterSatuan from "./pages/MasterSatuan";
import MasterGudang from "./pages/MasterGudang";
import AnalisisPareto from "./pages/AnalisisPareto";
import AnalisisPembelian from "./pages/AnalisisPembelian";
import AnalisisHarga from "./pages/AnalisisHarga";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Shared routes (both roles) */}
            <Route path="/dashboard" element={<ProtectedRoute roles={['manager', 'cashier']}><Index /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute roles={['manager', 'cashier']}><Expenses /></ProtectedRoute>} />

            {/* Cashier - Penjualan */}
            <Route path="/transactions" element={<ProtectedRoute roles={['cashier']}><Transactions /></ProtectedRoute>} />
            <Route path="/penjualan/pesanan" element={<ProtectedRoute roles={['cashier']}><PlaceholderPage title="Pesanan Penjualan" description="Kelola pesanan penjualan yang masuk." /></ProtectedRoute>} />
            <Route path="/penjualan/daftar" element={<ProtectedRoute roles={['cashier']}><PlaceholderPage title="Daftar Penjualan" description="Lihat riwayat semua transaksi penjualan." /></ProtectedRoute>} />
            <Route path="/penjualan/retur" element={<ProtectedRoute roles={['cashier']}><PlaceholderPage title="Retur Penjualan" description="Kelola pengembalian barang dari pelanggan." /></ProtectedRoute>} />
            <Route path="/penjualan/tertolak" element={<ProtectedRoute roles={['cashier']}><PlaceholderPage title="Penjualan Tertolak" description="Lihat daftar penjualan yang ditolak atau gagal." /></ProtectedRoute>} />
            <Route path="/penjualan/qris" element={<ProtectedRoute roles={['cashier']}><PlaceholderPage title="QRIS" description="Kelola pembayaran melalui QRIS." /></ProtectedRoute>} />

            {/* Manager only */}
            <Route path="/products" element={<ProtectedRoute roles={['manager']}><Products /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute roles={['manager']}><ProductDetail /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute roles={['manager']}><Employees /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute roles={['manager']}><AIChat /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute roles={['manager']}><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute roles={['manager']}><Settings /></ProtectedRoute>} />

            {/* Master Data */}
            <Route path="/master/kategori" element={<ProtectedRoute roles={['manager']}><MasterKategori /></ProtectedRoute>} />
            <Route path="/master/satuan" element={<ProtectedRoute roles={['manager']}><MasterSatuan /></ProtectedRoute>} />
            <Route path="/master/gudang" element={<ProtectedRoute roles={['manager']}><MasterGudang /></ProtectedRoute>} />

            {/* Persediaan */}
            <Route path="/persediaan/produk" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Daftar Produk" description="Kelola daftar produk persediaan." /></ProtectedRoute>} />
            <Route path="/persediaan/defecta" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Defecta" description="Kelola daftar barang defecta/rusak." /></ProtectedRoute>} />
            <Route path="/persediaan/kadaluarsa" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Stok Kadaluarsa" description="Pantau stok yang mendekati atau sudah kadaluarsa." /></ProtectedRoute>} />
            <Route path="/persediaan/opname" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Stok Opname" description="Lakukan pengecekan stok fisik vs sistem." /></ProtectedRoute>} />
            <Route path="/persediaan/penyesuaian" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Penyesuaian Stok" description="Sesuaikan jumlah stok secara manual." /></ProtectedRoute>} />

            {/* Analisis */}
            <Route path="/analisis/pareto" element={<ProtectedRoute roles={['manager']}><AnalisisPareto /></ProtectedRoute>} />
            <Route path="/analisis/pembelian" element={<ProtectedRoute roles={['manager']}><AnalisisPembelian /></ProtectedRoute>} />
            <Route path="/analisis/harga" element={<ProtectedRoute roles={['manager']}><AnalisisHarga /></ProtectedRoute>} />

            {/* Laporan */}
            <Route path="/laporan/penjualan" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Laporan Penjualan" description="Laporan detail transaksi penjualan." /></ProtectedRoute>} />
            <Route path="/laporan/pembelian" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Laporan Pembelian" description="Laporan detail pembelian bahan baku." /></ProtectedRoute>} />
            <Route path="/laporan/persediaan" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Laporan Persediaan" description="Laporan stok dan pergerakan barang." /></ProtectedRoute>} />
            <Route path="/laporan/keuangan" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Laporan Keuangan" description="Laporan keuangan lengkap bisnis." /></ProtectedRoute>} />

            {/* Multi Outlet */}
            <Route path="/outlet/mutasi-request" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Permintaan Mutasi" description="Ajukan permintaan mutasi stok antar outlet." /></ProtectedRoute>} />
            <Route path="/outlet/mutasi" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Mutasi Antar Outlet" description="Kelola perpindahan stok antar outlet." /></ProtectedRoute>} />
            <Route path="/outlet/produk-mitra" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Daftar Produk Mitra" description="Lihat produk dari outlet mitra." /></ProtectedRoute>} />
            <Route path="/outlet/outlet-mitra" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Daftar Outlet Mitra" description="Kelola daftar outlet mitra." /></ProtectedRoute>} />

            {/* Manajemen Pengguna */}
            <Route path="/users" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Daftar Pengguna" description="Kelola semua akun pengguna dalam sistem." /></ProtectedRoute>} />
            <Route path="/users/roles" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Peran & Hak Akses" description="Atur peran dan izin akses untuk setiap pengguna." /></ProtectedRoute>} />
            <Route path="/users/log" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Log Aktivitas" description="Pantau semua aktivitas pengguna dalam sistem." /></ProtectedRoute>} />

            {/* Pengaturan */}
            <Route path="/settings/config" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Konfigurasi" description="Konfigurasi sistem, notifikasi, dan preferensi." /></ProtectedRoute>} />

            {/* Pusat Bantuan */}
            <Route path="/help/request" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Minta Bantuan" description="Hubungi tim support untuk bantuan teknis." /></ProtectedRoute>} />
            <Route path="/help/updates" element={<ProtectedRoute roles={['manager']}><PlaceholderPage title="Riwayat Update" description="Lihat perubahan dan pembaruan sistem terbaru." /></ProtectedRoute>} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

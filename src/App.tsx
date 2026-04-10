import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import DaftarProduk from "./pages/persediaan/DaftarProduk";
import Defecta from "./pages/persediaan/Defecta";
import StokKadaluarsa from "./pages/persediaan/StokKadaluarsa";
import StokOpname from "./pages/persediaan/StokOpname";
import PenyesuaianStok from "./pages/persediaan/PenyesuaianStok";
import MasterKategori from "./pages/MasterKategori";
import MasterSatuan from "./pages/MasterSatuan";
import MasterGudang from "./pages/MasterGudang";
import AnalisisPareto from "./pages/AnalisisPareto";
import AnalisisPembelian from "./pages/AnalisisPembelian";
import AnalisisHarga from "./pages/AnalisisHarga";
import PermintaanMutasi from "./pages/outlet/PermintaanMutasi";
import MutasiAntarOutlet from "./pages/outlet/MutasiAntarOutlet";
import ProdukMitra from "./pages/outlet/ProdukMitra";
import OutletMitra from "./pages/outlet/OutletMitra";
import LaporanPenjualan from "./pages/laporan/LaporanPenjualan";
import LaporanPembelian from "./pages/laporan/LaporanPembelian";
import LaporanPersediaan from "./pages/laporan/LaporanPersediaan";
import LaporanKeuangan from "./pages/laporan/LaporanKeuangan";
import PesananPenjualan from "./pages/penjualan/PesananPenjualan";
import DaftarPenjualan from "./pages/penjualan/DaftarPenjualan";
import ReturPenjualan from "./pages/penjualan/ReturPenjualan";
import PenjualanTertolak from "./pages/penjualan/PenjualanTertolak";
import QRIS from "./pages/penjualan/QRIS";
import DaftarPengguna from "./pages/users/DaftarPengguna";
import PeranHakAkses from "./pages/users/PeranHakAkses";
import LogAktivitas from "./pages/users/LogAktivitas";
import Konfigurasi from "./pages/settings/Konfigurasi";
import MintaBantuan from "./pages/help/MintaBantuan";
import RiwayatUpdate from "./pages/help/RiwayatUpdate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard - now under Laporan for manager */}
            <Route path="/dashboard" element={<ProtectedRoute roles={['manager']}><Index /></ProtectedRoute>} />

            {/* Pengeluaran */}
            <Route path="/expenses" element={<ProtectedRoute roles={['manager', 'cashier']}><Expenses /></ProtectedRoute>} />

            {/* Cashier - Kasir (primary) */}
            <Route path="/transactions" element={<ProtectedRoute roles={['cashier']}><Transactions /></ProtectedRoute>} />

            {/* Cashier - Penjualan (dropdown) */}
            <Route path="/penjualan/pesanan" element={<ProtectedRoute roles={['cashier']}><PesananPenjualan /></ProtectedRoute>} />
            <Route path="/penjualan/daftar" element={<ProtectedRoute roles={['cashier']}><DaftarPenjualan /></ProtectedRoute>} />
            <Route path="/penjualan/retur" element={<ProtectedRoute roles={['cashier']}><ReturPenjualan /></ProtectedRoute>} />
            <Route path="/penjualan/tertolak" element={<ProtectedRoute roles={['cashier']}><PenjualanTertolak /></ProtectedRoute>} />
            <Route path="/penjualan/qris" element={<ProtectedRoute roles={['cashier']}><QRIS /></ProtectedRoute>} />

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
            <Route path="/persediaan/produk" element={<ProtectedRoute roles={['manager']}><DaftarProduk /></ProtectedRoute>} />
            <Route path="/persediaan/defecta" element={<ProtectedRoute roles={['manager']}><Defecta /></ProtectedRoute>} />
            <Route path="/persediaan/kadaluarsa" element={<ProtectedRoute roles={['manager']}><StokKadaluarsa /></ProtectedRoute>} />
            <Route path="/persediaan/opname" element={<ProtectedRoute roles={['manager']}><StokOpname /></ProtectedRoute>} />
            <Route path="/persediaan/penyesuaian" element={<ProtectedRoute roles={['manager']}><PenyesuaianStok /></ProtectedRoute>} />

            {/* Analisis */}
            <Route path="/analisis/pareto" element={<ProtectedRoute roles={['manager']}><AnalisisPareto /></ProtectedRoute>} />
            <Route path="/analisis/pembelian" element={<ProtectedRoute roles={['manager']}><AnalisisPembelian /></ProtectedRoute>} />
            <Route path="/analisis/harga" element={<ProtectedRoute roles={['manager']}><AnalisisHarga /></ProtectedRoute>} />

            {/* Laporan */}
            <Route path="/laporan/penjualan" element={<ProtectedRoute roles={['manager']}><LaporanPenjualan /></ProtectedRoute>} />
            <Route path="/laporan/pembelian" element={<ProtectedRoute roles={['manager']}><LaporanPembelian /></ProtectedRoute>} />
            <Route path="/laporan/persediaan" element={<ProtectedRoute roles={['manager']}><LaporanPersediaan /></ProtectedRoute>} />
            <Route path="/laporan/keuangan" element={<ProtectedRoute roles={['manager']}><LaporanKeuangan /></ProtectedRoute>} />

            {/* Multi Outlet */}
            <Route path="/outlet/mutasi-request" element={<ProtectedRoute roles={['manager']}><PermintaanMutasi /></ProtectedRoute>} />
            <Route path="/outlet/mutasi" element={<ProtectedRoute roles={['manager']}><MutasiAntarOutlet /></ProtectedRoute>} />
            <Route path="/outlet/produk-mitra" element={<ProtectedRoute roles={['manager']}><ProdukMitra /></ProtectedRoute>} />
            <Route path="/outlet/outlet-mitra" element={<ProtectedRoute roles={['manager']}><OutletMitra /></ProtectedRoute>} />

            {/* Manajemen Pengguna */}
            <Route path="/users" element={<ProtectedRoute roles={['manager']}><DaftarPengguna /></ProtectedRoute>} />
            <Route path="/users/roles" element={<ProtectedRoute roles={['manager']}><PeranHakAkses /></ProtectedRoute>} />
            <Route path="/users/log" element={<ProtectedRoute roles={['manager']}><LogAktivitas /></ProtectedRoute>} />

            {/* Pengaturan */}
            <Route path="/settings/config" element={<ProtectedRoute roles={['manager']}><Konfigurasi /></ProtectedRoute>} />

            {/* Pusat Bantuan */}
            <Route path="/help/request" element={<ProtectedRoute roles={['manager']}><MintaBantuan /></ProtectedRoute>} />
            <Route path="/help/updates" element={<ProtectedRoute roles={['manager']}><RiwayatUpdate /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

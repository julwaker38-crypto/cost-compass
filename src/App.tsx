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
import NotFound from "./pages/NotFound";

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

            {/* Cashier only */}
            <Route path="/transactions" element={<ProtectedRoute roles={['cashier']}><Transactions /></ProtectedRoute>} />

            {/* Manager only */}
            <Route path="/products" element={<ProtectedRoute roles={['manager']}><Products /></ProtectedRoute>} />
            <Route path="/product/:id" element={<ProtectedRoute roles={['manager']}><ProductDetail /></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute roles={['manager']}><Employees /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute roles={['manager']}><AIChat /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute roles={['manager']}><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute roles={['manager']}><Settings /></ProtectedRoute>} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import AIAssistant from "./components/AIAssistant";
import Settings from "./components/Settings";
import NotFound from "./pages/NotFound";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

// Public Route component (redirects to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading spinner
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      </Route>
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

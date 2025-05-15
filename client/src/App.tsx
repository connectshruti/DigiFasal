import React from 'react';
import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import { createContext, useState } from "react";
import { User } from "./types";
import Home from "./pages/home";
import Marketplace from "./pages/marketplace";
import ProductDetail from "./pages/product-detail";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Services from "./pages/services";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";

// Create Auth Context
export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

// Create Cart Context
export const CartContext = createContext<{
  cart: Array<{ product: any; quantity: number }>;
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
});

function Router() {
  return (
    <Routes>
 <Route path="/" element={<Home />} />
  <Route path="/marketplace" element={<Marketplace />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/services" element={<Services />} />
  <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
   // ✅ Sync user to localStorage when it changes
   React.useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const addToCart = (product: any, quantity: number) => {
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (Number(item.product.price) * item.quantity), 0);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
        <CartContext.Provider value={{ 
          cart, 
          addToCart, 
          removeFromCart, 
          clearCart, 
          getTotalItems, 
          getTotalPrice 
        }}>
          <TooltipProvider>
            <Header onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <main>
              <Router />
            </main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

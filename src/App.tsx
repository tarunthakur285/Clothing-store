import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
//import { Newsletter } from './components/Newsletter';
import { Cart } from './components/Cart';
import { LoginModal } from './components/LoginModal';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductDetails } from './pages/ProductDetails';
import { NewArrivals } from './pages/NewArrivals';
import { Women } from './pages/Women';
import { Men } from './pages/Men';
import { Accessories } from './pages/Accessories';

export const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-neutral-50">
          <Navbar 
            onCartClick={() => setIsCartOpen(true)}
            onLoginClick={() => setIsLoginOpen(true)}
          />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/women" element={<Women />} />
              <Route path="/men" element={<Men />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </AnimatePresence>
          
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
          <Toaster position="bottom-right" />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
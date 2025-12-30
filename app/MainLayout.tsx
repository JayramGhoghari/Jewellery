"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/src/components/Header';
import Hero from '@/src/components/Hero';
import ProductGallery from '@/src/components/ProductGallery';
import DesignStudio from '@/src/components/DesignStudio';
import AdminPanel from '@/src/components/AdminPanel';
import Reviews from '@/src/components/Reviews';
import Cart from '@/src/components/Cart';
import Footer from '@/src/components/Footer';

type View = 'home' | 'gallery' | 'design' | 'admin' | 'reviews';

// Map URL paths to views
const pathToView: Record<string, View> = {
  '/': 'home',
  '/Home': 'home',
  '/home': 'home',
  '/collection': 'gallery',
  '/Collection': 'gallery',
  '/designstudio': 'design',
  '/DesignStudio': 'design',
  '/Admin': 'admin',
  '/admin': 'admin',
  '/reviews': 'reviews',
  '/Reviews': 'reviews',
};

// Routes that should not show MainLayout (authentication pages)
const authRoutes = ['/user', '/register', '/login', '/admin/login'];

// Map views to URL paths
const viewToPath: Record<View, string> = {
  home: '/Home',
  gallery: '/collection',
  design: '/designstudio',
  admin: '/Admin',
  reviews: '/reviews',
};

export default function MainLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentView, setCurrentView] = useState<View>('home');
  const [showCart, setShowCart] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize view from URL on mount
  useEffect(() => {
    // Normalize pathname to handle case variations
    const normalizedPath = pathname || '/';
    
    // Don't initialize if this is an auth route
    if (authRoutes.includes(normalizedPath) || authRoutes.includes(normalizedPath.toLowerCase())) {
      return;
    }
    
    // Try exact match first, then lowercase match
    const view = pathToView[normalizedPath] || pathToView[normalizedPath.toLowerCase()] || 'home';
    setCurrentView(view);
    setIsInitialized(true);
  }, [pathname]);

  // Update URL when view changes (after initialization)
  const handleViewChange = (view: View) => {
    setCurrentView(view);
    const path = viewToPath[view];
    if (pathname !== path) {
      router.push(path);
    }
  };

  // Don't render if this is an auth route or not initialized
  const normalizedPath = pathname || '/';
  if (authRoutes.includes(normalizedPath) || authRoutes.includes(normalizedPath.toLowerCase())) {
    return null;
  }
  
  if (!isInitialized) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header currentView={currentView} setCurrentView={handleViewChange} onCartClick={() => setShowCart(true)} />

      {currentView === 'home' && <Hero setCurrentView={handleViewChange} />}
      {currentView === 'gallery' && <ProductGallery onQuickCheckout={() => setShowCart(true)} />}
      {currentView === 'design' && <DesignStudio />}
      {currentView === 'admin' && <AdminPanel />}
      {currentView === 'reviews' && <Reviews />}

      <Cart isOpen={showCart} onClose={() => setShowCart(false)} />

      <Footer />
    </div>
  );
}

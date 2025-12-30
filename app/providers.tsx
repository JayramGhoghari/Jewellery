"use client";

import { CartProvider } from '@/src/context/CartContext';
import { OrdersProvider } from '@/src/context/OrdersContext';
import { ThemeProvider } from '@/src/context/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <OrdersProvider>
        <CartProvider>{children}</CartProvider>
      </OrdersProvider>
    </ThemeProvider>
  );
}


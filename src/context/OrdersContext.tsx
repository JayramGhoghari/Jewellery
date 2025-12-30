import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem } from './CartContext';

export interface OrderRecord {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    note?: string;
  };
  items: CartItem[];
  total: number;
  createdAt: string;
}

interface OrdersContextType {
  orders: OrderRecord[];
  addOrder: (order: Omit<OrderRecord, 'id' | 'createdAt'>) => OrderRecord;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize orders from localStorage on client-side only
  useEffect(() => {
    setMounted(true);
    
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('jewelryOrders');
        if (saved) {
          const parsedOrders = JSON.parse(saved);
          setOrders(parsedOrders);
        }
      } catch (error) {
        console.error('Failed to load orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage only on client-side after mount
  useEffect(() => {
    if (typeof window !== 'undefined' && mounted) {
      try {
        localStorage.setItem('jewelryOrders', JSON.stringify(orders));
      } catch (error) {
        console.error('Failed to save orders to localStorage:', error);
      }
    }
  }, [orders, mounted]);

  const addOrder = (order: Omit<OrderRecord, 'id' | 'createdAt'>): OrderRecord => {
    const record: OrderRecord = {
      ...order,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [record, ...prev]);
    return record;
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}


import { X, ShieldCheck, Send } from 'lucide-react';
import { useState } from 'react';
import type { CartItem } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    note?: string;
  }) => void;
}

export default function CheckoutModal({ isOpen, onClose, items, total, onSubmit }: CheckoutModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Name, email, and phone number are required to reserve your order.');
      return;
    }
    setSubmitting(true);

    try {
      // Convert prices to cents and format for API
      const orderData = {
        user: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim()
        },
        items: items.map(item => ({
          productId: item.id || String(Date.now()), // Fallback if no ID
          name: item.name || 'Unnamed Product',
          price: Math.round((item.price || 0) * 100), // Convert to cents, default to 0
          quantity: item.quantity || 1, // Default to 1 if missing
          image: (item.image && item.image.trim()) ? item.image.trim() : undefined, // Only include if valid
          meta: item.customization || undefined
        })),
        shipping: form.address.trim() ? { address: form.address.trim() } : undefined,
        notes: form.note.trim() || undefined
      };

      // Log the data being sent for debugging
      console.log('📤 Sending order data:', orderData);

      // Try to submit order directly (health check removed to avoid CORS issues)
      const response = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Show validation errors in a user-friendly way
        if (errorData.issues && Array.isArray(errorData.issues)) {
          const errorMessages = errorData.issues.map((issue: { field: string; message: string }) => 
            `${issue.field}: ${issue.message}`
          ).join(', ');
          throw new Error(errorMessages || errorData.message || 'Failed to create order');
        }
        throw new Error(errorData.message || errorData.error || 'Failed to create order');
      }

      const result = await response.json();
      console.log('✅ Order saved to database:', result.order);
      
      // Show success message briefly
      setError('');
      setSubmitting(false);
      
      // Call the original onSubmit to update local state and clear cart
      onSubmit(form);
      
      // Close modal after brief delay to show success
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      console.error('❌ Order submission error:', err);
      
      let errorMessage = 'Failed to submit order. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('fetch') || err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'Cannot connect to API server. Please:\n\n1. Make sure API is running: cd api && npm run dev\n2. Check http://localhost:4000/health in browser\n3. If that works, try checkout again';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-2xl w-full max-w-3xl shadow-2xl border border-slate-800/70">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/70 bg-slate-900/70 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-400/15 border border-cyan-400/30 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-sm text-cyan-300 font-semibold tracking-wide uppercase">Secure Checkout</p>
              <p className="text-xs text-slate-400">We reserve your piece with your details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 px-6 py-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-2">Contact</p>
              <input
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Full name *"
                required
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="Email *"
                required
                className="mt-3 w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Details</p>
              <input
                value={form.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="Phone number *"
                required
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <textarea
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
                placeholder="Address (for delivery or appraisal paperwork)"
                className="mt-3 w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none h-24"
              />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Note</p>
              <textarea
                value={form.note}
                onChange={e => handleChange('note', e.target.value)}
                placeholder="Ring size, engraving, delivery preferences..."
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none h-20"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Items</span>
                <span>{items.length}</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm text-slate-200">
                    <span className="truncate pr-2">{item.name} × {item.quantity}</span>
                    <span className="text-cyan-300">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-slate-700 pt-3">
                <span className="text-slate-400 text-sm">Total</span>
                <span className="text-2xl font-semibold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 py-3 rounded-lg font-semibold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-cyan-400/30 transition-all disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting...' : 'Confirm & Reserve'}
            </button>
            <p className="text-xs text-slate-500 text-center">
              Your order is securely stored and a concierge will reach out to finalize payment & delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


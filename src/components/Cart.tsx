import Image from 'next/image';
import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, Receipt } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import CheckoutModal from './CheckoutModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { addOrder } = useOrders();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl flex flex-col border-l border-slate-700/50">
        <div className="border-b border-slate-700/50 px-6 py-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl sticky top-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-slate-900" />
            </div>
            <h2 className="text-xl font-light text-white tracking-wide">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="bg-slate-700/30 p-6 rounded-full mb-4 w-fit">
              <ShoppingBag className="w-16 h-16 text-slate-600" />
            </div>
            <h3 className="text-xl font-light text-white mb-2">Cart is Empty</h3>
            <p className="text-slate-400 mb-8 font-light">Discover our collection and create your perfect jewelry piece</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 px-6 py-3 rounded-lg font-light uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.map(item => (
                <div key={item.id} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 flex gap-4 hover:border-cyan-400/30 transition-all">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-light text-white mb-1 truncate text-sm">{item.name}</h3>
                      <p className="text-cyan-400 font-light text-sm mb-2">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>

                      {item.customization && (
                        <div className="text-xs text-slate-400 space-y-0.5 mb-2 font-light">
                          <p>Metal: {item.customization.metal}</p>
                          <p>Gemstone: {item.customization.gemstone}</p>
                          {item.customization.engraving && (
                            <p>Engraved: &quot;{item.customization.engraving}&quot;</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-600/50 rounded transition-colors text-slate-300 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-light text-white text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-600/50 rounded transition-colors text-slate-300 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400/70 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700/50 px-6 py-6 space-y-4 bg-slate-900/50 backdrop-blur-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-light text-slate-400">Subtotal:</span>
                  <span className="font-light text-slate-300">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-light text-slate-400">Shipping:</span>
                  <span className="font-light text-cyan-400">FREE</span>
                </div>
              </div>

              <div className="h-px bg-slate-700/50"></div>

              <div className="flex items-center justify-between">
                <span className="font-light text-white">Total:</span>
                <span className="text-3xl font-light bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 py-4 rounded-lg font-semibold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-cyan-400/30 transition-all flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                Reserve & Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 py-3 rounded-lg text-xs font-light uppercase tracking-widest transition-all"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={items}
        total={totalPrice}
        onSubmit={data => {
          addOrder({
            customer: data,
            items,
            total: totalPrice
          });
          clearCart();
        }}
      />
    </div>
  );
}

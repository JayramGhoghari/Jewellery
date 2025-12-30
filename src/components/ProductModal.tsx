import Image from 'next/image';
import { X, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  gallery?: string[];
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [isAdded, setIsAdded] = useState(false);
  const gallery = (product.gallery && product.gallery.length > 0)
    ? [product.image, ...product.gallery]
    : [
        product.image,
        'https://a.1stdibscdn.com/archivesE/upload/1121189/j_22594931483612697878/2259493_master.jpg',
        'https://images.pexels.com/photos/1458893/pexels-photo-1458893.jpeg?auto=compress&cs=tinysrgb&w=800'
      ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700/50">
        <div className="sticky top-0 bg-slate-900/95 border-b border-slate-700/50 backdrop-blur-xl px-8 py-6 flex items-center justify-between">
          <h3 className="text-xl font-light text-white tracking-wide">Product Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 p-8">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl h-96 bg-gradient-to-br from-slate-700/30 to-slate-900/30">
              <Image
                src={gallery[activeIndex]}
                alt={`${product.name} view ${activeIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={img + idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-24 rounded-lg overflow-hidden border transition-all ${
                    activeIndex === idx
                      ? 'border-cyan-400 shadow-lg shadow-cyan-400/30'
                      : 'border-slate-700/60 hover:border-cyan-400/40'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                  {activeIndex === idx && (
                    <span className="absolute inset-0 bg-cyan-400/10"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-light tracking-widest text-cyan-400 uppercase bg-cyan-400/10 px-3 py-1 rounded-lg border border-cyan-400/30">
                  {product.category}
                </span>
              </div>
              <h2 className="text-4xl font-light text-white mb-6">
                {product.name}
              </h2>
              <p className="text-slate-300 leading-relaxed font-light text-lg">
                {product.description}
              </p>
            </div>

            <div className="border-t border-slate-700/50 pt-8">
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-5xl font-light bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-slate-400 font-light">USD</span>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full relative py-4 rounded-lg font-light uppercase tracking-widest text-sm overflow-hidden group transition-all duration-500 ${
                  isAdded
                    ? 'bg-green-500/20 border border-green-500'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg hover:shadow-cyan-400/30 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-green-400">Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </div>
              </button>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 space-y-4">
              <h4 className="font-light text-white text-lg">Premium Features</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                  Expertly handcrafted by master artisans
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                  Premium certified materials & gemstones
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                  Lifetime warranty & maintenance guarantee
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                  Complimentary worldwide shipping & insurance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

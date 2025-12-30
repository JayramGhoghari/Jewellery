import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
  note?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    price: 2499,
    category: 'Rings',
    image: '/images/diamond.jpg',
    description: 'Elegant 18K white gold ring with 1.5ct diamond solitaire',
    badge: 'Best Seller', 
    note: 'Price includes GIA certification'
  },
  {
    id: '2',
    name: 'Pearl Drop Earrings',
    price: 899,
    category: 'Earrings',
    image: 'https://a.1stdibscdn.com/archivesE/upload/1121189/j_22594931483612697878/2259493_master.jpg',
    description: 'Cultured pearls with diamond accents in rose gold'
  },
  {
    id: '3',
    name: 'Gold Chain Necklace',
    price: 1299,
    category: 'Necklaces',
    image: 'https://blog.southindiajewels.com/wp-content/uploads/2019/12/traditional-gold-necklace-designs-1.jpg',
    description: '22K yellow gold chain with intricate craftsmanship'
  },
  {
    id: '4',
    name: 'Emerald Tennis Bracelet',
    price: 3499,
    category: 'Bracelets',
    image: '/images/bracelets.jpg',
    description: 'Stunning emerald stones set in platinum'
  },
  {
    id: '5',
    name: 'Sapphire Halo Ring',
    price: 2899,
    category: 'Rings',
    image: 'https://www.jeenjewels.com/8379-33748/2-carat-cushion-cut-blue-sapphire-and-diamond-halo-engagement-ring-in-white-gold.jpg',
    description: 'Blue sapphire surrounded by brilliant diamonds'
  },
  {
    id: '6',
    name: 'Rose Gold Hoops',
    price: 599,
    category: 'Earrings',
    image: 'https://tse2.mm.bing.net/th/id/OIP.Rt1udVJFn1FxkJRVUWcN9QHaHa?pid=Api&P=0&h=180',
    description: 'Classic rose gold hoop earrings with modern twist'
  },
  {
    id: '7',
    name: 'Ruby Pendant Necklace',
    price: 1899,
    category: 'Necklaces',
    image: 'https://i.pinimg.com/736x/be/71/bb/be71bba1f34bd3fdb7a2d6a49c6566d6--diamond-necklace-simple-ruby-necklace.jpg',
    description: 'Heart-shaped ruby with delicate gold chain'
  },
  {
    id: '8',
    name: 'Diamond Bangle Set',
    price: 4299,
    category: 'Bracelets',
    image: 'https://san-bro.com/wp-content/uploads/2020/05/Beautiful-Elegant-Silver-Bracelet-Chain-Bracelet-Bangle-For-Women-Lady-Fashion-Jewelry.jpg',
    description: 'Set of three diamond-studded bangles'
  },
  {
    id: '10',
    name: 'Radiant Cut Diamond Ensemble',
    price: 7890,
    category: 'Diamonds',
    image: 'https://images.pexels.com/photos/1395305/pexels-photo-1395305.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Radiant-cut centerpiece with matching diamond band crafted for daily luxury.',
    badge: 'New Arrival',
    note: 'Insured overnight shipping worldwide'
  },
  {
    id: '11',
    name: 'Heirloom Cushion Diamond Ring',
    price: 9150,
    category: 'Diamonds',
    image: 'https://mdcdiamonds.com/images/ProductImages/ES360-1.jpg',
    description: 'Vintage-inspired cushion diamond with milgrain detailing and platinum shank.',
    badge: 'Heritage Cut',
    note: 'Includes lifetime cleaning and servicing'
  },
  {
    id: '12',
    name: 'Trio Diamond Statement Set',
    price: 10400,
    category: 'Diamonds',
    image: 'https://cdn.shopify.com/s/files/1/0277/9601/3133/files/71_89e748ce-7de2-4df5-8ad6-721369a6644e_480x480.jpg?v=1603700935',
    description: 'Three-stone diamond showcase with tapered baguettes for elegant symmetry.',
    badge: 'Limited Release',
    note: 'Complimentary annual insurance valuation'
  },
  {
    id: '13',
    name: 'Bracelet',
    price: 10400,
    category: 'Diamonds',
    image: 'https://san-bro.com/wp-content/uploads/2020/05/Beautiful-Elegant-Silver-Bracelet-Chain-Bracelet-Bangle-For-Women-Lady-Fashion-Jewelry.jpg',
    description: 'Three-stone diamond showcase with tapered baguettes for elegant symmetry.',
    badge: 'Limited Release',
    note: 'Complimentary annual insurance valuation'
  }
];

const categories = ['All', 'Diamonds', 'Rings', 'Earrings', 'Necklaces', 'Bracelets'];

interface ProductGalleryProps {
  onQuickCheckout?: () => void;
}

export default function ProductGallery({ onQuickCheckout }: ProductGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [savedNotice, setSavedNotice] = useState('');
  const { addToCart } = useCart();

  // Initialize from localStorage on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSearch = localStorage.getItem('jewelrySearch');
        const savedUserName = localStorage.getItem('jewelryUserName');
        const savedUserEmail = localStorage.getItem('jewelryUserEmail');
        
        if (savedSearch) setSearchTerm(savedSearch);
        if (savedUserName) setUserName(savedUserName);
        if (savedUserEmail) setUserEmail(savedUserEmail);
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    }
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = term.length === 0
      ? true
      : [p.name, p.description, p.category].some(field =>
          field.toLowerCase().includes(term)
        );
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleQuickCheckout = (product: Product) => {
    handleAddToCart(product);
    onQuickCheckout?.();
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSaveSearch = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('jewelrySearch', searchTerm);
        if (userName.trim()) localStorage.setItem('jewelryUserName', userName.trim());
        if (userEmail.trim()) localStorage.setItem('jewelryUserEmail', userEmail.trim());
        setSavedNotice('Saved for your next visit');
        setTimeout(() => setSavedNotice(''), 2000);
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  };

  const insights = [
    {
      title: 'Viewed today',
      metric: `${Math.max(filteredProducts.length * 12, 72)}`,
      sub: 'Unique views',
      bars: [68, 72, 70, 74, 78, 76, 80],
      accent: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'Conversion intent',
      metric: '32%',
      sub: 'Added to cart',
      bars: [22, 28, 31, 29, 32, 30, 32],
      accent: 'from-emerald-400 to-teal-500'
    },
    {
      title: 'Top product',
      metric: 'Oval lab diamond',
      sub: 'Most saved today',
      bars: [40, 42, 50, 48, 55, 60, 58],
      accent: 'from-amber-300 to-orange-400'
    }
  ];

  const recentActivity = [
    { name: 'Anika', action: 'Reserved a GIA diamond ring', time: '2 mins ago' },
    { name: 'Rahul', action: 'Viewed halo sapphires', time: '8 mins ago' },
    { name: 'Mia', action: 'Purchased platinum tennis bracelet', time: '15 mins ago' },
    { name: 'Leo', action: 'Comparing oval solitaires', time: '22 mins ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900/95 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 space-y-8">
        <div className="mb-16">
          <h2 className="text-5xl font-light text-white mb-4 tracking-tight">
            Our Collection
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          <p className="text-slate-300 max-w-2xl mt-6 font-light leading-relaxed">
            Explore our meticulously curated selection of luxury jewelry pieces. Each item is handcrafted with precision and elegance.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur shadow-2xl shadow-black/40">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm text-slate-300 font-light">Search by style, gem, or category</label>
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="e.g. diamond ring, halo, oval, platinum"
                className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <p className="text-xs text-slate-400 flex items-center gap-2">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                <span className="h-1 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400">Save your search & contact</label>
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Name (optional)"
                className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors mb-2"
              />
              <input
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                placeholder="Email (optional)"
                className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors mb-2"
              />
              <button
                onClick={handleSaveSearch}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 rounded-lg py-2 text-sm font-semibold uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
              >
                Save Search
              </button>
              {savedNotice && <p className="text-xs text-cyan-300 mt-1">{savedNotice}</p>}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map(insight => (
            <div
              key={insight.title}
              className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 backdrop-blur shadow-xl shadow-black/30"
            >
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">{insight.title}</p>
              <p className="text-2xl text-white font-semibold">{insight.metric}</p>
              <p className="text-xs text-slate-400 mb-4">{insight.sub}</p>
              <div className="flex items-end gap-1 h-12">
                {insight.bars.map((bar, idx) => (
                  <div
                    key={idx}
                    className={`w-full rounded-full bg-gradient-to-t ${insight.accent}`}
                    style={{ height: `${bar}%`, maxHeight: '48px' }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-500/10 border border-cyan-400/30">
              <Eye className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <p className="text-sm text-slate-300">Viewed today</p>
              <p className="text-lg text-white font-semibold">{Math.max(filteredProducts.length, 6)} luxury pieces browsed</p>
              <p className="text-xs text-slate-500">Real-time interest to boost buyer confidence</p>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
            <p className="text-sm text-slate-300 mb-3">Recent activity</p>
            <div className="space-y-2">
              {recentActivity.map(entry => (
                <div key={entry.name + entry.time} className="flex items-center justify-between text-sm text-slate-200">
                  <span className="truncate">{entry.name} — {entry.action}</span>
                  <span className="text-cyan-300 text-xs">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-lg font-light uppercase tracking-widest text-xs transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 shadow-lg shadow-cyan-400/30'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/10"
            >
              <div className="relative overflow-hidden h-72 bg-gradient-to-br from-slate-700/50 to-slate-900/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500/80 text-white'
                        : 'bg-slate-900/60 text-gray-300 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="bg-slate-900/80 hover:bg-cyan-400 text-white p-3 rounded-full backdrop-blur-md transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 p-3 rounded-full hover:shadow-lg hover:shadow-cyan-400/50 transition-all font-bold"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  {onQuickCheckout && (
                    <button
                      onClick={() => handleQuickCheckout(product)}
                      className="bg-slate-900/80 hover:bg-emerald-400 text-white px-3 py-3 rounded-full backdrop-blur-md transition-all text-xs font-semibold uppercase tracking-wide"
                    >
                      Quick
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <p className="text-xs font-light tracking-widest text-cyan-400 uppercase">{product.category}</p>
                <h3 className="font-light text-lg text-white">{product.name}</h3>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-light bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.badge && (
                    <span className="text-[11px] font-semibold tracking-wide uppercase text-slate-900 bg-gradient-to-r from-cyan-300 to-blue-400 px-2 py-1 rounded-md">
                      {product.badge}
                    </span>
                  )}
                </div>
                {product.note && (
                  <p className="text-xs text-slate-400 font-light">{product.note}</p>
                )}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-light">
                  <span className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-2 py-1 border border-slate-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> GIA / IGI Certified
                  </span>
                  <span className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-2 py-1 border border-slate-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Free insured delivery
                  </span>
                  <span className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-2 py-1 border border-slate-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Lifetime warranty
                  </span>
                  <span className="flex items-center gap-2 bg-slate-800/60 rounded-lg px-2 py-1 border border-slate-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span> Free resizing & cleaning
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

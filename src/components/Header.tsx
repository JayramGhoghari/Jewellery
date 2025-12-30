import Image from 'next/image';
import { ShoppingBag, Gem, Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

type View = 'home' | 'gallery' | 'design' | 'admin' | 'reviews';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onCartClick: () => void;
}

export default function Header({ currentView, setCurrentView, onCartClick }: HeaderProps) {
  const router = useRouter();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
      <nav className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-60 group-hover:opacity-90 transition duration-300"></div>
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-cyan-500/20 border border-slate-800/80">
                <Image
                  src="https://wallpaperaccess.com/full/4609744.jpg"
                  alt="LUMIÈRE ATELIER signature"
                  fill
                  sizes="48px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                <Gem className="absolute bottom-1 right-1 w-5 h-5 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text drop-shadow" />
              </div>
            </div>
            <div>
              <span className="text-xl font-light tracking-widest text-slate-900 dark:text-white">LUMIÈRE</span>
              <span className="block text-xs font-light text-cyan-600 dark:text-cyan-400 tracking-wider">ATELIER</span>
            </div>
          </button>

          <div className="flex items-center gap-12">
            <div className="flex items-center gap-8  md:flex">
              <button
                onClick={() => setCurrentView('home')}
                className={`text-xs font-light tracking-widest uppercase transition-all duration-300 relative group ${
                  currentView === 'home' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-gray-300'
                }`}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full ${currentView === 'home' ? 'w-full' : ''}`}></span>
              </button>
              <button
                onClick={() => setCurrentView('gallery')}
                className={`text-xs font-light tracking-widest uppercase transition-all duration-300 relative group ${
                  currentView === 'gallery' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-gray-300'
                }`}
              >
                Collection
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full ${currentView === 'gallery' ? 'w-full' : ''}`}></span>
              </button>
              <button
                onClick={() => setCurrentView('design')}
                className={`text-xs font-light tracking-widest uppercase transition-all duration-300 relative group ${
                  currentView === 'design' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-gray-300'
                }`}
              >
                Design Studio
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full ${currentView === 'design' ? 'w-full' : ''}`}></span>
              </button>
              <button
                onClick={() => setCurrentView('reviews')}
                className={`text-xs font-light tracking-widest uppercase transition-all duration-300 relative group ${
                  currentView === 'reviews' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-gray-300'
                }`}
              >
                Reviews
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full ${currentView === 'reviews' ? 'w-full' : ''}`}></span>
              </button>
              <button
                onClick={() => router.push('/Admin')}
                className={`text-xs font-light tracking-widest uppercase transition-all duration-300 relative group ${
                  currentView === 'admin' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-gray-300'
                }`}
              >
                Admin
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full ${currentView === 'admin' ? 'w-full' : ''}`}></span>
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-300"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-cyan-400" />
              ) : (
                <Moon className="w-5 h-5 text-cyan-600" />
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-3 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-300 group"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg shadow-cyan-400/50">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

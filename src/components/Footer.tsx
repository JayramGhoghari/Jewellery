import { Mail, Phone, MapPin, Gem } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
                <Gem className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <span className="text-lg font-light tracking-widest text-white block">LUMIÈRE</span>
                <span className="text-xs font-light text-cyan-400 tracking-wider">ATELIER</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Crafting exceptional jewelry pieces that celebrate your unique story. Each design is a testament to artisanal excellence and timeless elegance.
            </p>
          </div>

          <div>
            <h3 className="font-light text-white mb-6 uppercase tracking-widest text-sm">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">Our Collection</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">Design Studio</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">Jewelry Care</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-white mb-6 uppercase tracking-widest text-sm">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">Shipping & Returns</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">Warranty & Repairs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">Track Order</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-light text-white mb-6 uppercase tracking-widest text-sm">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <a href="mailto:hello@lumierejewels.com" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">
                  hello@lumierejewels.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-slate-400 hover:text-cyan-400 transition-colors font-light">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-400 font-light">
                  123 Jewelry Lane<br />New York, NY 10001<br />United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs font-light tracking-widest uppercase">
              &copy; 2024 Lumière Atelier. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-xs font-light uppercase tracking-widest">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-xs font-light uppercase tracking-widest">Terms</a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-xs font-light uppercase tracking-widest">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

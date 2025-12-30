import Image from 'next/image';
import { ArrowRight, Palette, Sparkles } from 'lucide-react';

interface HeroProps {
  setCurrentView: (view: 'gallery' | 'design') => void;
}

export default function Hero({ setCurrentView }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-light tracking-widest text-cyan-400 uppercase">Luxury Crafted</span>
            </div>

            <div>
              <h1 className="text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight mb-4">
                Create Your
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent font-normal">
                  Perfect Jewel
                </span>
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4"></div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed max-w-md font-light">
              Experience the pinnacle of jewelry design. Explore our curated collection or craft your bespoke masterpiece using our advanced design studio.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setCurrentView('design')}
                className="group relative px-8 py-4 rounded-lg font-light uppercase tracking-widest text-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 text-slate-900">
                  <Palette className="w-4 h-4" />
                  Design Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setCurrentView('gallery')}
                className="group px-8 py-4 rounded-lg font-light uppercase tracking-widest text-sm border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                Explore Collection
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer">
                  <Image
                    src="/images/Ring.png"
                    alt="Elegant ring"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <h3 className="text-white font-light text-lg">Diamond Rings</h3>
                      <p className="text-cyan-400 text-sm font-light">Premium Collection</p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl h-72 cursor-pointer">
                  <Image
                    src="/images/Necklace1.jpg"
                    alt="Gold necklace"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <h3 className="text-white font-light text-lg">Gold Necklaces</h3>
                      <p className="text-cyan-400 text-sm font-light">Timeless Elegance</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="group relative overflow-hidden rounded-2xl h-72 cursor-pointer">
                  <Image
                    src="/images/heavy-earring.jpg"
                    alt="Pearl earrings"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <h3 className="text-white font-light text-lg">Pearl Earrings</h3>
                      <p className="text-cyan-400 text-sm font-light">Classic Beauty</p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer">
                  <Image
                    src="/images/bracelets.jpg"
                    alt="Custom bracelet"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <h3 className="text-white font-light text-lg">Bracelets</h3>
                      <p className="text-cyan-400 text-sm font-light">Personal Style</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

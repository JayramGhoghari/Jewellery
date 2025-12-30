import Image from 'next/image';
import { useState } from 'react';
import { Sparkles, ShoppingCart, Check, Rotate3D } from 'lucide-react';
import { useCart } from '../context/CartContext';

const jewelryTypes = [
  {
    id: 'ring',
    name: 'Ring',
    basePrice: 1200,
    gallery: [
      '/images/Ring.jpg'
    ]
  },
  {
    id: 'necklace',
    name: 'Necklace',
    basePrice: 1500,
    gallery: [
      '/images/Necklace.jpg',
      'https://tse3.mm.bing.net/th/id/OIP.VeRiwF2Ce7U-MvCQU1EU6AHaHa?pid=Api&P=0&h=180',
      
    ]
  },
  {
    id: 'earrings',
    name: 'Earrings',
    basePrice: 800,
    gallery: [
      'https://a.1stdibscdn.com/archivesE/upload/1121189/j_22594931483612697878/2259493_master.jpg',
      'https://a.1stdibscdn.com/archivesE/upload/1121189/j_22594931483612697878/2259493_master.jpg',
      'https://a.1stdibscdn.com/archivesE/upload/1121189/j_22594931483612697878/2259493_master.jpg'
    ]
  },
  {
    id: 'bracelet',
    name: 'Bracelet',
    basePrice: 1000,
    gallery: [
      '/images/bracelets.jpg',
      'https://images.pexels.com/photos/7580503/pexels-photo-7580503.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/14076161/pexels-photo-14076161.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];

const metals = [
  { id: 'yellow-gold', name: 'Yellow Gold', color: 'from-yellow-400 to-yellow-600', price: 0 },
  { id: 'white-gold', name: 'White Gold', color: 'from-gray-200 to-gray-400', price: 200 },
  { id: 'rose-gold', name: 'Rose Gold', color: 'from-red-200 to-yellow-300', price: 150 },
  { id: 'platinum', name: 'Platinum', color: 'from-slate-300 to-slate-500', price: 500 }
];

const gemstones = [
  { id: 'diamond', name: 'Diamond', color: 'from-cyan-300 to-cyan-500', price: 1000 },
  { id: 'sapphire', name: 'Sapphire', color: 'from-blue-400 to-blue-700', price: 600 },
  { id: 'emerald', name: 'Emerald', color: 'from-green-400 to-green-700', price: 700 },
  { id: 'ruby', name: 'Ruby', color: 'from-red-400 to-red-700', price: 800 },
  { id: 'pearl', name: 'Pearl', color: 'from-pink-100 to-pink-300', price: 300 },
  { id: 'none', name: 'None', color: 'from-gray-400 to-gray-600', price: 0 }
];

const finishes = [
  { id: 'polished', name: 'Polished', price: 0 },
  { id: 'matte', name: 'Matte', price: 100 },
  { id: 'brushed', name: 'Brushed', price: 100 }
];

const shapes = [
  { id: 'round', name: 'Round Brilliant', price: 0 },
  { id: 'oval', name: 'Oval', price: 150 },
  { id: 'cushion', name: 'Cushion', price: 180 },
  { id: 'emerald', name: 'Emerald', price: 220 },
  { id: 'princess', name: 'Princess', price: 200 }
];

const caratWeights = [
  { id: '0.75', name: '0.75 ct', price: 0 },
  { id: '1.0', name: '1.00 ct', price: 450 },
  { id: '1.5', name: '1.50 ct', price: 950 },
  { id: '2.0', name: '2.00 ct', price: 1900 }
];

const ringSizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'];
const bandWidths = [
  { id: 'thin', name: '2 mm (delicate)', price: 0 },
  { id: 'classic', name: '3 mm (classic)', price: 120 },
  { id: 'bold', name: '4 mm (statement)', price: 240 }
];

export default function DesignStudio() {
  const [selectedType, setSelectedType] = useState(jewelryTypes[0]);
  const [selectedMetal, setSelectedMetal] = useState(metals[0]);
  const [selectedGemstone, setSelectedGemstone] = useState(gemstones[0]);
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [selectedCarat, setSelectedCarat] = useState(caratWeights[1]);
  const [selectedSize, setSelectedSize] = useState(ringSizes[3]);
  const [selectedBandWidth, setSelectedBandWidth] = useState(bandWidths[1]);
  const [engraving, setEngraving] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activePreview, setActivePreview] = useState(0);
  const { addToCart } = useCart();

  const totalPrice =
    selectedType.basePrice +
    selectedMetal.price +
    selectedGemstone.price +
    selectedFinish.price +
    selectedShape.price +
    selectedCarat.price +
    selectedBandWidth.price;

  const steps = [
    { id: 1, title: 'Style', description: 'Pick your base silhouette' },
    { id: 2, title: 'Materials', description: 'Metal & gemstone' },
    { id: 3, title: 'Stone Specs', description: 'Shape & carat weight' },
    { id: 4, title: 'Fit & Feel', description: 'Ring size & band width' },
    { id: 5, title: 'Finish & Personalize', description: 'Surface & engraving' }
  ];

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedType.name}`,
      price: totalPrice,
      image: selectedType.gallery[0],
      customization: {
        metal: selectedMetal.name,
        gemstone: selectedGemstone.name,
        shape: selectedShape.name,
        carat: selectedCarat.name,
        bandWidth: selectedBandWidth.name,
        size: selectedType.id === 'ring' ? selectedSize : undefined,
        finish: selectedFinish.name,
        engraving: engraving || undefined
      }
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h2 className="text-5xl font-light text-white tracking-tight">Design Studio</h2>
            <Sparkles className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Craft your bespoke jewelry with our interactive design studio. Select from premium materials, gemstones, and finishes to create a truly unique piece.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 backdrop-blur mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {steps.map(step => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-4 py-3 rounded-xl text-left border transition-all duration-300 w-48 ${
                  currentStep === step.id
                    ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-lg shadow-cyan-400/20'
                    : 'border-slate-700 text-slate-300 hover:border-cyan-400/50 hover:text-white'
                }`}
              >
                <p className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">Step {step.id}</p>
                <p className="text-sm font-light">{step.title}</p>
                <p className="text-xs text-slate-400">{step.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {currentStep === 1 && (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  Jewelry Type
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {jewelryTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 h-48 group ${
                        selectedType.id === type.id
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <Image
                        src={type.gallery[0]}
                        alt={type.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex items-end p-4">
                        <div>
                          <span className="text-white font-light text-lg block">{type.name}</span>
                          <span className="text-cyan-400 text-sm font-light">${type.basePrice}</span>
                        </div>
                      </div>
                      {selectedType.id === type.id && (
                        <div className="absolute top-3 right-3 bg-cyan-400 text-slate-900 rounded-full p-2">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  Metal & Gemstone
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {metals.map(metal => (
                    <button
                      key={metal.id}
                      onClick={() => setSelectedMetal(metal)}
                      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                        selectedMetal.id === metal.id
                          ? 'border-cyan-400 bg-slate-700/50 shadow-lg shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-white font-light text-lg">{metal.name}</h4>
                          <p className="text-cyan-400 text-sm font-light">
                            {metal.price > 0 ? `+$${metal.price}` : 'Base'}
                          </p>
                        </div>
                        {selectedMetal.id === metal.id && (
                          <Check className="w-5 h-5 text-cyan-400" />
                        )}
                      </div>
                      <div className={`h-8 rounded w-full bg-gradient-to-r ${metal.color}`}></div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  {gemstones.map(gem => (
                    <button
                      key={gem.id}
                      onClick={() => setSelectedGemstone(gem)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                        selectedGemstone.id === gem.id
                          ? 'border-cyan-400 bg-slate-700/50 shadow-lg shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'
                      }`}
                    >
                      <div className={`h-12 rounded mb-3 bg-gradient-to-br ${gem.color}`}></div>
                      <h4 className="text-white font-light text-sm">{gem.name}</h4>
                      <p className="text-cyan-400 text-xs font-light mt-1">
                        {gem.price > 0 ? `+$${gem.price}` : 'Free'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  Stone Specs
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {shapes.map(shape => (
                    <button
                      key={shape.id}
                      onClick={() => setSelectedShape(shape)}
                      className={`p-5 rounded-lg border-2 transition-all duration-300 text-left ${
                        selectedShape.id === shape.id
                          ? 'border-cyan-400 bg-slate-700/50 shadow-lg shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-light">{shape.name}</h4>
                          <p className="text-cyan-400 text-sm font-light">
                            {shape.price > 0 ? `+$${shape.price}` : 'Included'}
                          </p>
                        </div>
                        {selectedShape.id === shape.id && <Check className="w-5 h-5 text-cyan-400" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {caratWeights.map(carat => (
                    <button
                      key={carat.id}
                      onClick={() => setSelectedCarat(carat)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                        selectedCarat.id === carat.id
                          ? 'border-cyan-400 bg-slate-700/50 shadow-lg shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'
                      }`}
                    >
                      <h4 className="text-white font-light">{carat.name}</h4>
                      <p className="text-cyan-400 text-xs font-light mt-1">
                        {carat.price > 0 ? `+$${carat.price}` : 'Included'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && selectedType.id === 'ring' && (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  Fit & Feel
                </h3>
                <div className="mb-6">
                  <p className="text-slate-300 font-light mb-3">Ring Size</p>
                  <div className="flex flex-wrap gap-2">
                    {ringSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                          selectedSize === size
                            ? 'border-cyan-400 bg-cyan-400/10 text-white'
                            : 'border-slate-700 text-slate-300 hover:border-cyan-400/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-slate-300 font-light mb-3">Band Width</p>
                  <div className="grid grid-cols-3 gap-3">
                    {bandWidths.map(band => (
                      <button
                        key={band.id}
                        onClick={() => setSelectedBandWidth(band)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedBandWidth.id === band.id
                            ? 'border-cyan-400 bg-slate-700/50 shadow-lg shadow-cyan-400/20'
                            : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'
                        }`}
                      >
                        <h4 className="text-white font-light text-sm">{band.name}</h4>
                        <p className="text-cyan-400 text-xs font-light mt-1">
                          {band.price > 0 ? `+$${band.price}` : 'Included'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-light text-white mb-6 flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">5.</span>
                  Finish & Personalization
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {finishes.map(finish => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                        selectedFinish.id === finish.id
                          ? 'border-cyan-400 bg-slate-700/50 shadow-lg shadow-cyan-400/20'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'
                      }`}
                    >
                      <h4 className="text-white font-light">{finish.name}</h4>
                      <p className="text-cyan-400 text-sm font-light mt-2">
                        {finish.price > 0 ? `+$${finish.price}` : 'Base'}
                      </p>
                    </button>
                  ))}
                </div>

                <label className="block mb-3">
                  <span className="text-slate-300 font-light text-sm">Engraving Text (Optional)</span>
                </label>
                <input
                  type="text"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="Add your message..."
                  maxLength={25}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none transition-colors font-light"
                />
                <p className="text-cyan-400 text-xs font-light mt-2">
                  {engraving.length}/25 characters
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                className="px-5 py-3 rounded-lg border border-slate-700 text-slate-200 font-light hover:border-cyan-400/60 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold uppercase tracking-widest hover:shadow-lg hover:shadow-cyan-400/30 transition-all"
              >
                {currentStep === 5 ? 'Review' : 'Next'}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-8 shadow-2xl">
              <h3 className="text-2xl font-light text-white mb-8">Your Design</h3>

              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 mb-6">
                <div className="relative mb-4 h-56">
                  <Image
                    src={selectedType.gallery[activePreview]}
                    alt={`${selectedType.name} preview ${activePreview + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/70 text-xs text-white px-3 py-1 rounded-lg flex items-center gap-2">
                    <Rotate3D className="w-4 h-4 text-cyan-300" />
                    360° Preview
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {selectedType.gallery.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setActivePreview(idx)}
                      className={`h-20 rounded-lg overflow-hidden border transition-all ${
                        activePreview === idx
                          ? 'border-cyan-400 shadow-cyan-400/20 shadow-lg'
                          : 'border-slate-700 hover:border-cyan-400/40'
                      }`}
                    >
                      <div className="relative h-full">
                        <Image
                          src={img}
                          alt={`${selectedType.name} thumb ${idx + 1}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedType.name}</span>
                    <span className="text-cyan-400">${selectedType.basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedMetal.name}</span>
                    <span className="text-cyan-400">{selectedMetal.price > 0 ? `+$${selectedMetal.price}` : 'Inc'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedGemstone.name}</span>
                    <span className="text-cyan-400">{selectedGemstone.price > 0 ? `+$${selectedGemstone.price}` : 'Inc'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedShape.name}</span>
                    <span className="text-cyan-400">{selectedShape.price > 0 ? `+$${selectedShape.price}` : 'Inc'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedCarat.name}</span>
                    <span className="text-cyan-400">{selectedCarat.price > 0 ? `+$${selectedCarat.price}` : 'Inc'}</span>
                  </div>
                  {selectedType.id === 'ring' && (
                    <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                      <span className="text-slate-300 font-light">Size {selectedSize}</span>
                      <span className="text-cyan-400">Included</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedBandWidth.name}</span>
                    <span className="text-cyan-400">{selectedBandWidth.price > 0 ? `+$${selectedBandWidth.price}` : 'Inc'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                    <span className="text-slate-300 font-light">{selectedFinish.name} Finish</span>
                    <span className="text-cyan-400">{selectedFinish.price > 0 ? `+$${selectedFinish.price}` : 'Inc'}</span>
                  </div>
                  {engraving && (
                    <div className="flex items-center justify-between pb-3 border-b border-slate-600/30">
                      <span className="text-slate-300 font-light">Engraving</span>
                      <span className="text-cyan-400 text-xs">Included</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-lg p-6 mb-6">
                <p className="text-slate-400 text-xs font-light mb-2 uppercase tracking-widest">Total Price</p>
                <div className="text-4xl font-light bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  ${totalPrice.toLocaleString()}
                </div>
                <p className="text-slate-400 text-xs font-light">Includes complimentary shipping & insurance</p>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-light uppercase tracking-widest text-sm transition-all duration-500 ${
                  isAdded
                    ? 'bg-green-500/20 border border-green-400 text-green-400'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:shadow-lg hover:shadow-cyan-400/30'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added!
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
          </div>
        </div>
      </div>
    </div>
  );
}

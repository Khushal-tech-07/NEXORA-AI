import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductViewer3D } from '../components/3d/ProductViewer3D';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Cpu,
  ArrowLeft,
  Share2,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useShop();

  const product = products.find((p) => p.id === id) || products[0];
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  // Customer reviews state for interactive reviews submission
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Dr. Elena Rostova',
      role: 'Quantum ML Researcher, MIT',
      rating: 5,
      date: '2 days ago',
      title: 'Revolutionary local tensor throughput',
      comment:
        'The latency difference when executing localized multi-modal models is astonishing. The hardware thermals remain whisper quiet even during sustained full-precision quantizations.',
    },
    {
      id: 2,
      author: 'Marcus Vance',
      role: 'Lead Industrial Designer',
      rating: 5,
      date: '1 week ago',
      title: 'Precision build quality is unmatched',
      comment:
        'The haptics and anodized titanium finish scream aerospace craftsmanship. This feels like tech sent backward 5 years from the future.',
    },
    {
      id: 3,
      author: 'Aria Chen',
      role: 'Robotics Software Architect',
      rating: 4.8,
      date: '2 weeks ago',
      title: 'Seamless sensor fusion across the ecosystem',
      comment:
        'Pairing with the VisionPro glasses took less than 3 seconds. The spatial telemetry synchronization works flawlessly out of the box.',
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    setReviews((prev) => [
      {
        id: Date.now(),
        author: newReviewAuthor,
        role: 'Verified Purchaser',
        rating: newReviewRating,
        date: 'Just now',
        title: 'Outstanding performance',
        comment: newReviewComment,
      },
      ...prev,
    ]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast('Your review has been verified and published to the neural network!', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all text-xs flex items-center gap-1.5"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Top Split: Left (3D Viewer & Thumbnails) | Right (Specs, Swatches, Add to Cart) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: 3D Product Viewer + Visual Strip */}
          <div className="lg:col-span-7 space-y-4">
            {viewMode === '3d' ? (
              <ProductViewer3D
                modelType={product.modelType}
                accentColor={selectedColor.hex}
                name={product.name}
              />
            ) : (
              <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl glass-panel overflow-hidden border border-cyan-500/20 shadow-2xl bg-slate-950 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Thumbnail Selector Strip */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  viewMode === '3d'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                    : 'glass-panel border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Interactive 3D Simulation</span>
              </button>

              <button
                onClick={() => setViewMode('photo')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  viewMode === 'photo'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.3)]'
                    : 'glass-panel border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Studio Photography</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Product Metadata, Pricing, Swatches, Purchase Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category and Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 font-bold uppercase tracking-wider">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-cyan-300/90 mt-1 font-medium">
                {product.tagline}
              </p>
            </div>

            {/* Price Section with Sale badge */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-slate-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-xs text-emerald-400 font-medium mt-0.5">
                  ✓ In Stock & Ready for Express Neural Dispatch
                </div>
              </div>

              {product.isSale && (
                <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                  Save {discountPercent}%
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Key Specs List with Checkmark Icons */}
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Core Neural Specifications
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {product.keySpecs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Swatch Selector */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider">
                  Chassis Finish:
                </span>
                <span className="text-cyan-400 font-semibold">{selectedColor.name}</span>
              </div>

              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                          : 'glass-panel border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart CTA Button */}
                <button
                  onClick={() => addToCart(product, quantity, selectedColor.name)}
                  className="flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 shadow-[0_0_25px_rgba(0,212,255,0.45)] hover:shadow-[0_0_35px_rgba(0,212,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 fill-slate-950" />
                  <span>Add to Cart • ${(product.price * quantity).toLocaleString()}</span>
                </button>

                {/* Wishlist Heart button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                      : 'glass-panel border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-400/40'
                  }`}
                  title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 text-center">
                <div className="p-2 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Free Express Air</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>2-Yr Warranty</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION BELOW: Description / Specifications / Reviews */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          {/* Tab Navigation buttons */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'desc'
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Description & Architecture
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hardware Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Verified Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'desc' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2 space-y-4 p-6 rounded-2xl glass-panel border border-white/5">
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Next-Generation Engineering
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {product.longDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {product.features.map((feat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                      <h4 className="text-sm font-bold text-cyan-400">{feat.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ecosystem Callout */}
              <div className="p-6 rounded-2xl glass-panel-glow border border-cyan-500/30 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Ecosystem Synchronized
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This device pairs effortlessly with all NEXORA neural devices via our encrypted Bluetooth Low Energy 5.4 mesh network, enabling real-time sensor sharing and unified state telemetry.
                </p>
                <div className="pt-2 text-xs font-semibold text-cyan-300">
                  Zero Cloud Configuration Required
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Specifications */}
          {activeTab === 'specs' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl glass-panel border border-white/5 overflow-hidden"
            >
              <h3 className="text-lg font-bold text-white mb-4 font-['Space_Grotesk']">
                Technical Data Sheet
              </h3>
              <div className="divide-y divide-white/5">
                {product.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-slate-400">{item.label}</span>
                    <span className="sm:col-span-2 text-white font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                        <p className="text-[11px] text-cyan-400">{rev.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(rev.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500">{rev.date}</span>
                      </div>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-200">{rev.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Submit a Review Box */}
              <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 space-y-4 h-fit">
                <h4 className="text-base font-bold text-white font-['Space_Grotesk']">
                  Submit Neural Feedback
                </h4>
                <p className="text-xs text-slate-400">
                  Share your benchmark telemetry and workflow experience with the community.
                </p>

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name / Handle
                    </label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Dr. Alex Mercer"
                      required
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setNewReviewRating(num)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            newReviewRating >= num
                              ? 'text-amber-400 border-amber-400/40 bg-amber-400/10'
                              : 'text-slate-600 border-white/5'
                          }`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Review Insights
                    </label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Detail your benchmarks, hardware durability, and daily performance..."
                      required
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all cursor-pointer"
                  >
                    Post Review
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>

        {/* RELATED PRODUCTS RECOMMENDATIONS ROW */}
        <div className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Related Neural Ecosystem Hardware
            </h3>
            <Link
              to="/products"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

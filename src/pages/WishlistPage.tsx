import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Star,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, showToast } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, 1);
    });
    showToast(`Transferred all ${savedProducts.length} items to your cart!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Heart className="w-4 h-4 fill-current" />
              <span>Saved Innovations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
              My Wishlist
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Curated collection of next-generation hardware awaiting your command.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,212,255,0.35)] transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart ({savedProducts.length})</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        {savedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-4 rounded-3xl glass-panel border border-white/10 max-w-lg mx-auto space-y-5"
          >
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto text-slate-600 shadow-inner">
              <Heart className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Save neural laptops, smart glasses, or autonomous robotics to track availability and instant price changes.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
            >
              <span>Explore Hardware Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {savedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-2xl glass-panel p-5 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4 group bg-[#0d1322]/90"
                >
                  <div className="space-y-3">
                    {/* Image & Remove Icon */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-white/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500 hover:text-white text-slate-400 backdrop-blur-md transition-all border border-white/10"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] font-bold text-cyan-400">
                        {product.category}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div>
                      <div className="flex items-center gap-1 text-xs text-amber-400 mb-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-slate-500">({product.reviewCount})</span>
                      </div>

                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Move to Cart Button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-lg font-extrabold text-white">
                        ${product.price.toLocaleString()}
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-slate-500 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

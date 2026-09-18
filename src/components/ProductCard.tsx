import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Heart, ShoppingBag, Eye, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative rounded-2xl glass-panel p-4 flex flex-col justify-between border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_10px_35px_-5px_rgba(0,212,255,0.25)] transition-all bg-[#0d1322]/80 backdrop-blur-xl"
    >
      {/* Top Badges & Wishlist Trigger */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950 border border-white/5 mb-3">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-black/30 pointer-events-none" />

        {/* Badge: New / Sale */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isSale && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md">
              Save {discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/90 text-white shadow-md">
              Neural Gen-4
            </span>
          )}
        </div>

        {/* Wishlist Heart button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
              : 'bg-slate-900/80 text-slate-300 hover:text-rose-400 hover:bg-slate-800'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick 3D View pill hover prompt */}
        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass-panel bg-slate-900/90 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan-500/30 shadow-lg hover:border-cyan-400"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive 3D</span>
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="text-[11px] font-semibold text-cyan-400 tracking-wide uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-white text-base tracking-tight leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Subtitle */}
        <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Color Swatch Indicators */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <span className="text-[10px] text-slate-400 ml-1">
            {product.colors.length} finishes
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-cyan-400 font-medium">Free Express Shipping</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

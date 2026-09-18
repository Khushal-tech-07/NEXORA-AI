import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    checkout,
    clearCart,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEXORA10' || promoCode.trim().toUpperCase() === 'AI2026') {
      setDiscount(Math.round(cartSubtotal * 0.1));
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "NEXORA10" for 10% off!');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - discount);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-slate-900 border-l border-cyan-500/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">Your Cart</h3>
                    <p className="text-xs text-slate-400">
                      {cart.reduce((s, i) => s + i.quantity, 0)} items selected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded transition-colors"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center mb-4 text-slate-500 shadow-inner">
                      <ShoppingBag className="w-9 h-9" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-1">Your cart is empty</h4>
                    <p className="text-xs text-slate-400 max-w-xs mb-6">
                      Explore our catalog of futuristic neural laptops, smart glasses, and AI companions.
                    </p>
                    <Link
                      to="/products"
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] flex items-center gap-2"
                    >
                      Browse Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="flex gap-4 p-3.5 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-cyan-500/20 transition-all group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Color: <span className="text-cyan-400">{item.selectedColor}</span>
                        </p>
                        <div className="text-sm font-bold text-white mt-1">
                          ${item.product.price.toLocaleString()}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-lg px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                              className="text-slate-400 hover:text-white p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold text-white px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                              className="text-slate-400 hover:text-white p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-slate-950/80 space-y-4">
                  {/* Promo code */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try NEXORA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode}
                      className="px-3 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 disabled:opacity-50 flex items-center gap-1"
                    >
                      {promoApplied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Apply'}
                    </button>
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-white">${cartSubtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Special AI Discount (10%)</span>
                        <span>-${discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Worldwide Neural Express Shipping</span>
                      <span className="text-cyan-400 font-medium">FREE</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between text-base font-bold text-white">
                      <span>Estimated Total</span>
                      <span className="text-cyan-300 glow-text-cyan">
                        ${finalTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA Button */}
                  <button
                    onClick={checkout}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 shadow-[0_0_25px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
                    <span>Proceed to Neural Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-Bit Encrypted Checkout • 30-Day Money Back</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

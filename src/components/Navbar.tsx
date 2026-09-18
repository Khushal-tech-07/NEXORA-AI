import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Bot,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'AI Assistant', path: '/ai-assistant', badge: 'AI' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0e1a]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0a0e1a] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider text-white font-['Space_Grotesk']">
                NEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">ORA</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-cyan-400/80 -mt-1 uppercase font-semibold">
                Neural Market
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                    active
                      ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-white/10 transition-all flex items-center gap-2 group"
              title="Search Products (Ctrl+K)"
            >
              <Search className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span className="hidden lg:inline text-xs text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-white/10 transition-all group"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              to="/account"
              className={`p-2.5 rounded-xl transition-all border ${
                location.pathname === '/account'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border-transparent hover:border-white/10'
              }`}
              title="Account & Orders"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all flex items-center gap-2"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl md:hidden text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-400 text-slate-950">
                    {link.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex gap-2">
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center text-xs font-semibold rounded-xl bg-slate-800 text-slate-200"
            >
              Dashboard
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center text-xs font-semibold rounded-xl bg-slate-800 text-slate-200"
            >
              Wishlist ({wishlist.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

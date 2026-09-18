import React from 'react';
import { Link } from 'react-router-dom';
import { HeroScene } from '../components/3d/HeroScene';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Globe2,
  Headphones,
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  ChevronRight,
  Star,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const featuredProducts = products.slice(0, 4);

  const trustBadges = [
    {
      icon: Cpu,
      title: 'AI Powered Technology',
      description: 'Dedicated on-device Neural Processing Units with 80+ TOPS local acceleration.',
    },
    {
      icon: ShieldCheck,
      title: 'Fast & Secure Shipping',
      description: 'Encrypted global logistics with tamper-evident zero-trust packaging.',
    },
    {
      icon: Globe2,
      title: 'Worldwide Shipping',
      description: 'Express door-to-door delivery across 180+ countries with duty prepaid.',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Instant human engineers paired with our fine-tuned NEXORA AI diagnostic team.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-slate-100 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-radial-hero">
        {/* Glow backdrop blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Futuristic Pill Announcement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>Next-Generation Neural Hardware Released</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Gen-4 Silicon</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-[1.08]"
              >
                The Future Is{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 glow-text-cyan">
                  AI Powered
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
              >
                Discover next-gen laptops, holographic smart glasses, autonomous robots, and ambient home hubs built with on-device tensor silicon and seamless zero-latency ecosystems.
              </motion.p>

              {/* Call to Actions */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 transition-all shadow-[0_0_30px_rgba(0,212,255,0.45)] hover:shadow-[0_0_40px_rgba(0,212,255,0.65)] flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/ai-assistant"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-cyan-300 glass-panel hover:bg-slate-800/80 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg group"
                >
                  <Bot className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Consult AI Shopping Bot</span>
                </Link>
              </motion.div>

              {/* Micro specs indicator */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>100% Offline AI Inference</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Zero Data Telemetry Leaks</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Robot Mascot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-transparent to-indigo-500/20">
                <HeroScene />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ROW OF 4 TRUST BADGES */}
      <section className="relative py-12 border-y border-white/10 bg-[#070b14]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide font-['Space_Grotesk'] mb-1">
                      {badge.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Zap className="w-4 h-4" />
              <span>Flagship Hardware Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk']">
              Featured Neural Innovations
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Equipped with our latest N1 tensor processors, military-grade materials, and ambient intelligence.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>View All 8 Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. BREAKTHROUGH TECH MATRIX / WHY CHOOSE NEXORA */}
      <section className="py-20 bg-gradient-to-b from-[#070b14] to-[#0a0e1a] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
              The NEXORA Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk']">
              Engineered for Symbiotic Intelligence
            </h2>
            <p className="text-base text-slate-400">
              Hardware designed from atomic silicon upward to anticipate, augment, and elevate human capability without compromising sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-500/40 transition-all space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                On-Device Tensor Engines
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Run massive 14B parameter foundation models locally. No subscription fees, zero cloud lag, and complete functional independence offline.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-cyan-300">
                80 TOPS Neural Co-Processor
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl glass-panel border border-indigo-500/20 hover:border-indigo-500/40 transition-all space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Zero-Knowledge Privacy Vault
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every voice recording, sensor reading, and eye-tracking vector stays isolated in hardware-enforced cryptographic enclaves.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-indigo-300">
                EAL6+ Hardware Secure Element
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/40 transition-all space-y-4 relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Instant Handoff Protocol
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Look at your laptop while wearing the VisionPro glasses to transfer active LLM context and windows with a single glance.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-purple-300">
                Sub-5ms Spatial Handshake
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CTA BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-panel-glow p-8 sm:p-14 overflow-hidden border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Need personalized guidance?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk']">
              Talk to Our Conversational AI Assistant
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Describe your tech setup, daily workflows, or budget, and our fine-tuned NEXORA Assistant will synthesize the perfect combination of neural devices.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/ai-assistant"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Launch Assistant</span>
              </Link>
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white glass-panel hover:bg-slate-800 transition-all border border-white/10"
              >
                Browse All Hardware
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Send,
  CheckCircle2,
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Cpu,
  ShieldCheck,
  Headphones,
  Globe2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#070b14] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-wider text-white font-['Space_Grotesk']">
                NEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">ORA</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Pioneering the next era of intelligent consumer computing. Engineered with local neural accelerators, spatial telemetry, and precision aerospace hardware.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Subscribe to Neural Dispatch
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Subscribed! Welcome to the forefront of AI hardware.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-3.5 py-2.5 text-xs bg-slate-900/90 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-['Space_Grotesk']">
              AI Hardware
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/products" className="hover:text-cyan-300 transition-colors">
                  Neural Laptops
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-300 transition-colors">
                  AR Smart Glasses
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-300 transition-colors">
                  Autonomous Robots
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-300 transition-colors">
                  Smart Home Hubs
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-300 transition-colors">
                  Cinematic AI Drones
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-['Space_Grotesk']">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/ai-assistant" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>AI Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors">
                  Architecture & Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors">
                  Global Support
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-cyan-300 transition-colors">
                  Order Telemetry
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-cyan-300 transition-colors">
                  Saved Innovations
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-['Space_Grotesk']">
              Nexus Community
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect with over 450,000 developers, robotics researchers, and early adopters.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NEXORA Neural Systems Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-slate-400">
            <Link to="/about" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-cyan-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-cyan-300 transition-colors">
              Security Compliance
            </Link>
            <span className="text-cyan-500/60 font-mono">v4.2-NEURAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

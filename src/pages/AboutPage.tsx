import React from 'react';
import {
  Sparkles,
  Cpu,
  ShieldCheck,
  Zap,
  Globe2,
  Users,
  Award,
  Leaf,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Cpu,
      title: 'Autonomous Local Intelligence',
      description:
        'We reject cloud-tethered dependency. True personal AI must execute on private silicon directly in your hands without subscription walls or continuous connectivity.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Knowledge Privacy Vaults',
      description:
        'Biometrics, room LiDAR point clouds, and conversational tokens remain locked in client-side secure hardware enclaves with physical kill-switches.',
    },
    {
      icon: Leaf,
      title: 'Aerospace & Recycled Titanium',
      description:
        'Chassis are machined from 100% recycled 7000-series aluminum and Grade 5 titanium, engineered for decades of durability with modular upgradability.',
    },
    {
      icon: Layers,
      title: 'Seamless Ecosystem Synchronization',
      description:
        'Our proprietary Sub-5ms spatial handshake lets your glasses, laptop, hub, and drone share sensor streams into a unified neural ambient overlay.',
    },
  ];

  const stats = [
    { value: '185,000+', label: 'Neural Devices Deployed Worldwide' },
    { value: '80 TOPS', label: 'Dedicated On-Device Silicon Acceleration' },
    { value: '52 Countries', label: 'Global Express Logistics Network' },
    { value: '99.7%', label: 'Hardware Reliability & Customer TrustScore' },
  ];

  const team = [
    {
      name: 'Dr. Katherine Vance',
      role: 'Co-Founder & Chief Neural Architect',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Former DARPA Neuromorphic Computing Lead; pioneered sub-1W tensor accelerators.',
    },
    {
      name: 'Kenji Takahashi',
      role: 'VP of Hardware Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Ex-head of aerospace avionics miniaturization and carbon fiber aerodynamics.',
    },
    {
      name: 'Siddharth Nair',
      role: 'Head of Spatial Computing',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneered micro-waveguide diffractive optics and real-time gaze telemetry systems.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 space-y-20">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The NEXORA Odyssey</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Pioneering the Era of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 glow-text-cyan">
              Human-AI Synergy
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Founded in 2024, NEXORA was conceived with an uncompromising thesis: artificial intelligence should liberate individuals, amplify innate creativity, and function reliably on private silicon—not in centralized data silos.
          </p>
        </div>

        {/* Global Impact Numbers Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-panel border border-cyan-500/20 text-center space-y-2 group hover:border-cyan-400 transition-all bg-[#0d1322]/80"
            >
              <div className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk'] group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Brand Mission & Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Our Founding Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Space_Grotesk']">
              Computing Re-imagined from the Atomic Substrate
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Modern consumer electronics have become repetitive slabs designed for cloud monetization and algorithmic surveillance. At NEXORA, we architect hardware that respects human sovereignty.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every laptop, smart glass frame, and desktop companion is infused with localized neural processing units capable of compiling and inferring multi-modal reasoning chains instantly. No cloud roundtrips, no monthly subscriptions to unlock hardware features, and absolute cryptographic data ownership.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero Telemetry Data Selling Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Right-to-Repair Modular Hardware Standard</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-2 shadow-[0_0_50px_rgba(0,212,255,0.15)]">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
              alt="Neural research laboratory"
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel bg-slate-950/80 border border-white/10 text-xs">
              <span className="text-cyan-400 font-bold block mb-1">
                San Francisco Neural Cleanroom
              </span>
              <span className="text-slate-300">
                Testing 80 TOPS sub-terahertz wafer packaging and waveguide diffraction angles.
              </span>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">
              Our Core Architectures
            </h2>
            <p className="text-sm text-slate-400">
              The ethical and technological guardrails that guide every silicon layer we fabricate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">
              Neural Engineering Leadership
            </h2>
            <p className="text-sm text-slate-400">
              World-class researchers from robotics, optoelectronics, and tensor compiler engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="rounded-2xl glass-panel overflow-hidden border border-white/10 group hover:border-cyan-500/40 transition-all flex flex-col"
              >
                <div className="aspect-square w-full overflow-hidden bg-slate-950">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-400 mt-0.5">{member.role}</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

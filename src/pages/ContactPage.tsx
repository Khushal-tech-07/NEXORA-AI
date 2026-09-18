import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Clock,
  Globe2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Hardware Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Dispatch received. An engineer will transmit telemetry within 4 hours.', 'success');
      setFormData({ name: '', email: '', subject: 'Hardware Inquiry', message: '' });
    }, 700);
  };

  const offices = [
    {
      city: 'San Francisco',
      region: 'North America HQ',
      address: '500 Howard Street, Suite 900, San Francisco, CA 94105',
      focus: 'Silicon Research & Foundation Compilers',
      coordinates: { x: '24%', y: '36%' },
    },
    {
      city: 'Tokyo',
      region: 'Asia-Pacific Neural Hub',
      address: 'Roppongi Hills Mori Tower 34F, Minato-ku, Tokyo 106-6108',
      focus: 'Optoelectronic Waveguides & Robotics Mobility',
      coordinates: { x: '82%', y: '40%' },
    },
    {
      city: 'Berlin',
      region: 'European Quantum Lab',
      address: 'Friedrichstraße 180, 10117 Berlin, Germany',
      focus: 'Zero-Knowledge Cryptography & Enclaves',
      coordinates: { x: '52%', y: '28%' },
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Transmission Channel</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Connect with NEXORA
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Have questions regarding enterprise hardware fleet deployments, developer SDK access, or custom neural accelerator configurations? Our team is on standby 24/7.
          </p>
        </div>

        {/* Contact Form & Contact Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-cyan-500/20 bg-slate-900/60 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Transmit a Message
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Encrypted end-to-end to our rapid dispatch response center.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Transmission Confirmed</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your communication has entered our high-priority neural queue. An assigned systems engineer will reach out via your provided email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@organization.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                  >
                    <option value="Hardware Inquiry">Product Inquiries & Specifications</option>
                    <option value="Order Support">Order Tracking & Shipping Telemetry</option>
                    <option value="Enterprise Fleet">Enterprise & Lab Volume Fleet Orders</option>
                    <option value="Developer SDK">Neural SDK & Local Model APIs</option>
                    <option value="Warranty">2-Year Global Hardware Warranty Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Transmission Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, hardware compatibility requirements, or question in detail..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Data...' : 'Dispatch Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Regional Hub Details & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Global Operations Matrix
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Email Dispatch</span>
                    <span className="text-slate-400">telemetry@nexora.hardware</span>
                    <span className="text-slate-400 block">support@nexora.hardware</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Encrypted Voice Hotline</span>
                    <span className="text-slate-400">+1 (888) 404-NEXORA (Toll-free USA/CA)</span>
                    <span className="text-slate-400 block">+81 3-5555-0199 (Tokyo Node)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Real-time Uptime</span>
                    <span className="text-emerald-400 font-semibold">24/7/365 Global Operations</span>
                    <span className="text-slate-400 block">Sub-15 minute average ticket resolution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Hub Cards */}
            <div className="space-y-3">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/20 transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-['Space_Grotesk']">
                      {office.city} Node
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-cyan-500/20 font-semibold">
                      {office.region}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{office.address}</p>
                  <p className="text-[11px] text-cyan-300/80 font-mono pt-1">
                    Specialization: {office.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EMBEDDED MAP PLACEHOLDER (Dark Futuristic Theme with Pulse Pins) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Global Cleanroom & Lab Network
              </h3>
              <p className="text-xs text-slate-400">
                Primary tensor silicon, optoelectronic waveguides, and quantum encryption facilities.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>3 Primary Hubs Synchronized</span>
            </div>
          </div>

          <div className="relative w-full h-80 sm:h-96 rounded-3xl glass-panel border border-cyan-500/30 overflow-hidden bg-[#070c18] shadow-2xl flex items-center justify-center">
            {/* World Map Grid SVG Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid-pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(0, 212, 255, 0.15)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>

            {/* Glowing continent outlines styling */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <Globe2 className="w-[450px] h-[450px] text-cyan-500/20" />
            </div>

            {/* Pulsing Pins for Offices */}
            {offices.map((off, i) => (
              <div
                key={i}
                className="absolute z-10 flex flex-col items-center group cursor-pointer"
                style={{ left: off.coordinates.x, top: off.coordinates.y }}
              >
                {/* Pulse Ring */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-cyan-400/30 animate-ping" />
                  <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-950 shadow-[0_0_15px_#00d4ff]" />
                </div>

                {/* Pin Tooltip */}
                <div className="mt-2 px-2.5 py-1 rounded-lg glass-panel bg-slate-950/90 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 shadow-xl pointer-events-none group-hover:scale-110 transition-transform whitespace-nowrap">
                  {off.city} Node
                </div>
              </div>
            ))}

            {/* Center HUD Telemetry badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl glass-panel bg-slate-950/80 border border-white/10 text-[10px] font-mono text-slate-400 pointer-events-none flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LOGISTICS COORDINATES: 37.7749° N, 122.4194° W</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  LogOut,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  Save,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'profile'>('dashboard');

  // User profile mock state
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@neuralnet.io',
    membership: 'Founding Neural Pioneer',
    neuralScore: 984,
    shippingAddress: '404 Nexus Way, Innovation District, SF, CA 94107',
  });

  const [editProfile, setEditProfile] = useState(userProfile);

  const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(editProfile);
    showToast('Profile and biometric preferences saved!', 'success');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Truck className="w-3.5 h-3.5" />
            Shipped (In Transit)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            Processing
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-[0_0_25px_rgba(0,212,255,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl font-bold text-cyan-300 font-['Space_Grotesk']">
                AM
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] flex items-center gap-2">
                Hello, {userProfile.name} <span className="animate-bounce">👋</span>
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="text-cyan-400 font-medium">{userProfile.membership}</span>
                <span>•</span>
                <span>Neural ID: #NX-009214</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl glass-panel border border-cyan-500/20 text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Neural Reward Points
              </div>
              <div className="text-lg font-black text-cyan-300 glow-text-cyan">
                {userProfile.neuralScore} PTS
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar Navigation + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 rounded-2xl glass-panel border border-white/10 p-3 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Orders</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {orders.length}
              </span>
            </button>

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Wishlist</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {wishlist.length}
              </span>
            </Link>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>Profile & Security</span>
            </button>

            <div className="pt-3 border-t border-white/10 mt-2">
              <button
                onClick={() => showToast('Session locked. Neural sign-out simulated.', 'info')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 space-y-6">
            {/* STAT CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Total Orders</span>
                  <Package className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  {orders.length}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>All packages insured</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Wishlist Items</span>
                  <Heart className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  {wishlist.length}
                </div>
                <div className="text-[11px] text-cyan-400">
                  <Link to="/wishlist" className="hover:underline">
                    View saved items →
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Total Spent</span>
                  <DollarSign className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  ${totalSpent.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span>Includes free express freight</span>
                </div>
              </div>
            </div>

            {/* TAB: DASHBOARD & ORDERS LIST */}
            {(activeTab === 'dashboard' || activeTab === 'orders') && (
              <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden space-y-4 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                      Recent Orders
                    </h3>
                    <p className="text-xs text-slate-400">
                      Track your neural shipments and warranty certificates.
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Explore New Hardware →
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 space-y-3">
                    <Package className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-sm">No orders recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-xl bg-slate-900/70 border border-white/5 hover:border-cyan-500/20 transition-all space-y-3"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-white font-mono">
                              {order.orderNumber}
                            </span>
                            <span className="text-slate-400">{order.date}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-cyan-400">
                              {order.trackingNumber}
                            </span>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  className="w-10 h-10 object-cover rounded-lg bg-slate-950 border border-white/10"
                                />
                                <div>
                                  <h5 className="font-semibold text-white">
                                    {item.productName}
                                  </h5>
                                  <p className="text-slate-400 text-[11px]">
                                    Finish: {item.color} • Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="font-bold text-white">
                                ${(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Total & Tracking CTA */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            Total Paid:{' '}
                            <span className="text-white font-bold">
                              ${order.total.toLocaleString()}
                            </span>
                          </span>

                          <button
                            onClick={() =>
                              showToast(
                                `Telemetry updated: Package ${order.trackingNumber} is in courier synchronization hub.`,
                                'info'
                              )
                            }
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                          >
                            <span>Live Telemetry Track</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROFILE & SETTINGS */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl glass-panel border border-white/10 p-6 space-y-6"
              >
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                    Neural Profile & Security Parameters
                  </h3>
                  <p className="text-xs text-slate-400">
                    Manage your credentials, encryption key pairs, and primary delivery hubs.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editProfile.name}
                        onChange={(e) =>
                          setEditProfile({ ...editProfile, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editProfile.email}
                        onChange={(e) =>
                          setEditProfile({ ...editProfile, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary Delivery Node (Shipping Address)
                    </label>
                    <input
                      type="text"
                      value={editProfile.shippingAddress}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, shippingAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">
                        Zero-Knowledge Enclave Active
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        Your biometric signatures and local LLM telemetry logs are stored with client-side zero-knowledge encryption.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Parameters</span>
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ChatMessage } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Eye,
  RefreshCw,
  User,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const SUGGESTED_PROMPTS = [
  'I need the best laptop for running local AI models & development',
  'Which smart glasses support real-time audio and visual translation?',
  'Recommend a smart home hub with zero-latency local automation',
  'What is the best portable audio device with biometric tracking?',
];

export const AiAssistantPage: React.FC = () => {
  const { products, addToCart } = useShop();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-init',
      sender: 'assistant',
      timestamp: 'Just now',
      text: "Greetings! I am the NEXORA Neural Copilot. Whether you are engineering local machine learning workflows, seeking augmented reality optics, or orchestrating an autonomous smart home, I'll calculate the optimal hardware match for you.",
      checkpoints: [
        'On-device 80+ TOPS hardware comparison',
        'Cross-ecosystem telemetry & sensor compatibility',
        'Direct cart additions & specs consultation',
      ],
      followUps: [
        'What type of workflow do you prioritize?',
        'Do you have a specific budget in mind?',
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Formulate realistic AI response based on matching query
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedProducts: Product[] = [];
      let responseText = '';
      let checkpoints: string[] = [];
      let followUps: string[] = [];

      if (lower.includes('laptop') || lower.includes('dev') || lower.includes('code') || lower.includes('machine learning') || lower.includes('model')) {
        const laptop = products.find((p) => p.modelType === 'laptop') || products[0];
        matchedProducts = [laptop];
        responseText =
          `For machine learning workflows and local inference, I recommend the **${laptop.name}**. It is the only workstation in our lineup engineered with dedicated 80 TOPS tensor matrix co-processors, allowing you to run 14B parameter models with zero cloud egress.`;
        checkpoints = [
          '80 TOPS Neural Engine runs LLMs locally at 42 tok/sec',
          '64GB Unified LPDDR5X Memory gives massive context window capacity',
          '16" Tandem Micro-OLED calibrated for 100% DCI-P3 color precision',
          'CryoVapor dual-loop chamber maintains thermal silence under full load',
        ];
        followUps = [
          'Would you like to pair it with the VisionPro Glasses for multi-monitor spatial projection?',
          'What parameter sizes of models do you intend to run?',
        ];
      } else if (lower.includes('glass') || lower.includes('ar') || lower.includes('translate') || lower.includes('vision')) {
        const glasses = products.find((p) => p.modelType === 'glasses') || products[1];
        matchedProducts = [glasses];
        responseText =
          `The **${glasses.name}** is exactly what you need. Utilizing dual transparent micro-waveguides, it projects real-time conversational translations directly onto your field of view in 52 languages with sub-50ms latency.`;
        checkpoints = [
          'Ultra-light 48g magnesium-titanium frame for all-day comfort',
          'Sub-50ms visual and whisper-audio live translation',
          'Directional spatial audio prevents sound leakage to nearby bystanders',
          'Integrated Time-of-Flight LiDAR for room-scale spatial anchors',
        ];
        followUps = [
          'Are you planning on using prescription lenses?',
          'Would you like me to add it directly to your cart in Obsidian Matte?',
        ];
      } else if (lower.includes('robot') || lower.includes('companion') || lower.includes('desktop') || lower.includes('security')) {
        const bot = products.find((p) => p.modelType === 'robot') || products[2];
        matchedProducts = [bot];
        responseText =
          `The **${bot.name}** is our flagship autonomous companion. It acts as both a desktop productivity partner with expressive emotion synthesis and a roaming perimeter sentinel when you leave your residence.`;
        checkpoints = [
          'Adaptive conversational cadence aligned to your focus rhythms',
          '360° solid-state LiDAR for instant room mapping & obstacle avoidance',
          'Autonomous return-to-dock wireless fast induction charging',
          'Local hardware kill-switch for guaranteed camera and mic isolation',
        ];
        followUps = [
          'Do you prefer the Glacier White or Dark Nebula finish?',
          'Should I walk you through the security patrol setup?',
        ];
      } else if (lower.includes('hub') || lower.includes('home') || lower.includes('automation') || lower.includes('matter')) {
        const hub = products.find((p) => p.modelType === 'hub') || products[3];
        matchedProducts = [hub];
        responseText =
          `The **${hub.name}** is the definitive ambient automation nexus. Rather than relying on cloud pings, its micro-Doppler radar tracks room occupancy and environmental conditions locally with microsecond execution.`;
        checkpoints = [
          'Matter 2.0, Thread, Zigbee & Wi-Fi 7 unified multiprotocol bridge',
          'Sub-terahertz mmWave radar tracks biological presence without cameras',
          '30W down-firing acoustic chamber fills the room with rich audio',
          'Zero external cloud dependency for critical security logic',
        ];
        followUps = [
          'How many smart devices do you currently have deployed in your space?',
        ];
      } else if (lower.includes('audio') || lower.includes('headphone') || lower.includes('earbud') || lower.includes('music')) {
        const headphones = products.find((p) => p.modelType === 'headphones') || products[4];
        const earbuds = products.find((p) => p.modelType === 'earbuds') || products[7];
        matchedProducts = [headphones, earbuds];
        responseText =
          `Depending on your mobility needs, we offer two neural acoustic benchmarks: the **${headphones.name}** for studio immersion, and the **${earbuds.name}** for active on-the-go biometric tracking.`;
        checkpoints = [
          'Real-time acoustic ear-canal calibration at 48kHz',
          '-52dB intelligent hybrid active noise cancellation',
          'In-ear pulse and body temperature biometric monitoring',
          'Lossless 24-bit/192kHz LDAC & aptX wireless streaming',
        ];
        followUps = [
          'Do you prefer over-ear studio cups or ultralight in-ear buds?',
        ];
      } else if (lower.includes('drone') || lower.includes('fly') || lower.includes('camera') || lower.includes('video')) {
        const drone = products.find((p) => p.modelType === 'drone') || products[6];
        matchedProducts = [drone];
        responseText =
          `The **${drone.name}** is built for autonomous cinematic footage. Its onboard 32 TOPS vision network computes evasion paths around powerlines and dense trees without any pilot intervention.`;
        checkpoints = [
          '1-inch 50MP Sony CMOS sensor with 4K/120fps 10-bit HDR video',
          'Neural Follow Me 4.0 keeps lock even through thick tree canopies',
          'Sub-249g ultralight aerodynamic carbon fiber folding airframe',
          '46 minutes sustained hover and cruise flight endurance',
        ];
        followUps = [
          'Would you like to review sample 4K telemetry footage?',
        ];
      } else {
        // Fallback intelligent recommendation
        const p1 = products[0];
        const p2 = products[1];
        matchedProducts = [p1, p2];
        responseText =
          `Based on your query, the foundation of the NEXORA ecosystem begins with the **${p1.name}** and the **${p2.name}**. Together, they form an uninterrupted spatial workspace where local AI models compute instantly and seamlessly transfer across your line of sight.`;
        checkpoints = [
          'Unified Bluetooth Low Energy 5.4 encrypted mesh synchronization',
          'Zero-knowledge on-device neural security architecture',
          'Continuous firmware updates backed by 2-year warranty',
        ];
        followUps = [
          'Tell me about your primary computing environment (coding, creative, or home automation)?',
          'Would you like a breakdown of any specific device specs?',
        ];
      }

      const aiResponse: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseText,
        recommendations: matchedProducts,
        checkpoints,
        followUps,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Assistant Header */}
        <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 mb-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-[0_0_20px_rgba(0,212,255,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-['Space_Grotesk']">
                  NEXORA AI Copilot
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  Neural v3.2
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Online • Multi-Modal Hardware Diagnostic & Consultation
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages(initialMessages)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1.5"
            title="Reset Chat Session"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Suggested Prompt Chips */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            Suggested Inquiries:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-xs px-3.5 py-1.5 rounded-full glass-panel hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 space-y-6 pb-24 overflow-y-auto">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm space-y-3 ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                      : 'glass-panel border border-white/10 text-slate-200 shadow-xl'
                  }`}
                >
                  {/* Message Text */}
                  <div className="leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </div>

                  {/* Checklist of Selling Points / Capabilities if present */}
                  {msg.checkpoints && msg.checkpoints.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                        Verified Hardware Specifications:
                      </span>
                      {msg.checkpoints.map((cp, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{cp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Product Recommendation Cards inside AI Response */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="pt-3 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                        Recommended Devices:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {msg.recommendations.map((prod) => (
                          <div
                            key={prod.id}
                            className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex gap-3 items-center group hover:border-cyan-400 transition-all"
                          >
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-14 h-14 object-cover rounded-lg bg-slate-900 shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                                {prod.name}
                              </h5>
                              <div className="text-xs font-bold text-cyan-400 mt-0.5">
                                ${prod.price.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Link
                                  to={`/product/${prod.id}`}
                                  className="text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded"
                                >
                                  <Eye className="w-3 h-3" />
                                  3D View
                                </Link>
                                <button
                                  onClick={() => addToCart(prod, 1)}
                                  className="text-[11px] font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                                >
                                  <ShoppingBag className="w-3 h-3" />
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow-up prompts */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="pt-2 border-t border-white/5 space-y-1">
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Suggested next question:
                      </span>
                      {msg.followUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(fu)}
                          className="text-xs text-cyan-400 hover:text-cyan-300 underline block text-left"
                        >
                          → {fu}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[10px] ${
                      isUser ? 'text-slate-900 text-right' : 'text-slate-500 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-2 text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>NEXORA Neural Engine computing recommendation...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Bottom Input Bar */}
        <div className="sticky bottom-6 w-full pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 p-2 rounded-2xl glass-panel-glow bg-slate-900/95 border border-cyan-500/40 shadow-2xl backdrop-blur-xl"
          >
            <div className="pl-3 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about local LLMs, smart glasses, robots, home hubs..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none px-2"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

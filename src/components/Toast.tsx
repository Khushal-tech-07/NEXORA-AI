import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 max-w-md pointer-events-auto"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border shadow-2xl ${
              toast.type === 'success'
                ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-200 shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                : toast.type === 'error'
                ? 'bg-slate-900/90 border-rose-500/40 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                : 'bg-slate-900/90 border-purple-500/40 text-purple-200 shadow-[0_0_20px_rgba(123,97,255,0.25)]'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-purple-400 shrink-0" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

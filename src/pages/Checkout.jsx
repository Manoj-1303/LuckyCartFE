import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Truck, Package } from 'lucide-react';
import CartModule from '../context/CartContext';

function Checkout() {
  const { clearCart } = CartModule.useCart();
  const [orderState, setOrderState] = useState("idle");

  const handleOrder = (event) => {
    event.preventDefault();
    if (orderState !== "idle") return;
    
    setOrderState("processing");

    setTimeout(() => {
      setOrderState("success");
      clearCart();
    }, 3500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-dark">Checkout details</h2>
      <form onSubmit={handleOrder} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
        
        <input required type="text" placeholder="Full Name" className="p-3 border border-slate-300 rounded-lg outline-none" />
        <input required type="text" placeholder="Delivery Address" className="p-3 border border-slate-300 rounded-lg outline-none" />
        <input required type="text" placeholder="City" className="p-3 border border-slate-300 rounded-lg outline-none" />
        
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={orderState !== "idle"}
            className={`relative flex items-center justify-center h-16 rounded-full font-bold text-lg transition-colors duration-300 ${
              orderState === "idle"
                ? "bg-dark text-white w-64 hover:bg-slate-700"
                : orderState === "success"
                ? "bg-dark text-white w-64"
                : "bg-transparent w-80"}`}>
            <AnimatePresence mode="wait">
              {orderState === "idle" && (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Complete Order
                </motion.span>
              )}

              {orderState === "processing" && (
                <motion.div key="processing" className="absolute inset-0 flex items-center justify-center w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="absolute bottom-2 w-full h-1.5 bg-slate-400 rounded-full overflow-hidden"></div>
                  <motion.div className="absolute bottom-3 left-0 text-primary" initial={{ x: -50 }} animate={{ x: 250 }} transition={{ duration: 3, ease: "easeInOut" }}>
                    <Truck size={32} strokeWidth={1.5} fill="currentColor" />
                  </motion.div>
                  <motion.div className="absolute left-16 text-amber-600" initial={{ y: -40, opacity: 0 }} animate={{ y: 12, opacity: 1 }} transition={{ delay: 0.8, type: "spring", stiffness: 200 }}>
                    <Package size={16} fill="currentColor" />
                  </motion.div>
                </motion.div>
              )}

              {orderState === "success" && (
                <motion.div key="success" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <span>Order Placed</span>
                  <div className="flex items-center justify-center w-6 h-6 bg-secondary rounded-full text-dark">
                    <Check size={16} strokeWidth={3} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
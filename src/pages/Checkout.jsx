import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Truck, Package } from 'lucide-react';
import CartModule from '../context/CartContext';
import AuthModule from '../context/AuthContext';
import api from '../services/api';

function Checkout() {
  const { cart, clearCart } = CartModule.useCart();
  const { currentUser } = AuthModule.useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [orderState, setOrderState] = useState("idle");
  useEffect(() => {
    if (currentUser?.displayName) {
      setName(currentUser.displayName);
    }
  }, [currentUser]);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleOrder = async (event) => {
    event.preventDefault();
    if (orderState !== "idle") return;
    setOrderState("processing");
    setError("");
    try {
      const orderData = {
        firebaseUid: currentUser?.uid || "guest",
        userEmail: currentUser?.email || "guest@example.com",
        shippingAddress: { address, city },
        orderItems: cart.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        totalPrice: total
      };
      await api.post('/api/orders', orderData);
      setTimeout(() => {
        setOrderState("success");
        clearCart();
      }, 3500);
    } catch (err) {
      console.error("Failed to place order:", err);
      setError("Failed to process checkout. Please try again.");
      setOrderState("idle");
    }
  };
  if (cart.length === 0 && orderState !== "success") {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl mb-4 font-bold text-slate-800">Your cart is empty</h2>
        <Link to="/products" className="text-primary font-bold text-lg hover:underline">Go back to shop</Link>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-extrabold mb-6 text-slate-900 font-heading">Checkout</h2>{error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm py-3 px-4 rounded-xl text-center font-medium mb-6">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleOrder} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-4 h-fit">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Shipping Details</h3>
          
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
            <input 
              required 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="p-3 border border-slate-200 rounded-xl outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/30 transition text-slate-800 bg-slate-50" 
            />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Delivery Address</label>
            <input 
              required 
              type="text" 
              placeholder="123 Main St" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="p-3 border border-slate-200 rounded-xl outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/30 transition text-slate-800 bg-slate-50" 
            />
          </div>
          <div className="flex flex-col gap-1 text-left">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">City</label>
            <input 
              required 
              type="text" 
              placeholder="Chennai, Tamil Nadu" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              className="p-3 border border-slate-200 rounded-xl outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/30 transition text-slate-800 bg-slate-50" 
            />
          </div> 
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={orderState !== "idle"}
              className={`relative flex items-center justify-center h-14 rounded-xl font-bold text-base transition-all duration-300 cursor-pointer ${
                orderState === "idle"
                  ? "bg-primary text-white w-full hover:bg-orange-600 shadow-md hover:shadow-primary/20"
                  : orderState === "success"
                  ? "bg-emerald-500 text-white w-full"
                  : "bg-slate-100 text-slate-400 w-full cursor-not-allowed"}`}>
              <AnimatePresence mode="wait">
                {orderState === "idle" && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Place Order (₹{total})
                  </motion.span>
                )}
                {orderState === "processing" && (
                  <motion.div key="processing" className="absolute inset-0 flex items-center justify-center w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="absolute bottom-1 w-full h-1 bg-slate-200 rounded-full overflow-hidden"></div>
                    <motion.div className="absolute bottom-2 left-0 text-primary" initial={{ x: -20 }} animate={{ x: 260 }} transition={{ duration: 3, ease: "easeInOut" }}>
                      <Truck size={24} strokeWidth={2} fill="currentColor" />
                    </motion.div>
                    <motion.div className="absolute left-1/2 -translate-x-1/2 text-slate-500 text-xs font-bold">
                      Processing Order...
                    </motion.div>
                  </motion.div>
                )}
                {orderState === "success" && (
                  <motion.div key="success" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <span>Order Placed Successfully!</span>
                    <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full text-emerald-500">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </form>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 h-fit flex flex-col gap-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Order Summary</h3>
          <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-1">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center gap-4 text-sm border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-slate-150" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                    <p className="text-slate-400 text-xs mt-1">₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-2">
            <span className="text-base font-bold text-slate-500">Total Amount:</span>
            <span className="text-2xl font-extrabold text-slate-900 font-heading">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
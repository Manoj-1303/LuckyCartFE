import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import CartModule from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = CartModule.useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl mb-4 font-bold">Your cart is empty</h2>
        <Link to="/products" className="text-primary font-bold text-lg">Go back to shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-dark">Your Cart</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        {cart.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 py-4 last:border-0 gap-4">            
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-slate-100" />
              <div>
                <h3 className="font-bold text-lg text-dark leading-snug">{item.name}</h3>
                <p className="text-slate-500 text-sm mt-0.5">{item.category}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">              
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1 select-none">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200/80 text-slate-700 active:scale-95 transition cursor-pointer"
                  title={item.quantity === 1 ? "Remove item" : "Decrease quantity"} >
                  {item.quantity === 1 ? <Trash2 size={15} className="text-red-500" /> : <Minus size={15} />}
                </button>
                <span className="font-bold w-6 text-center text-sm text-dark">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200/80 text-slate-700 active:scale-95 transition cursor-pointer"
                  title="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <div className="text-right shrink-0 min-w-[90px]">
                <span className="font-extrabold text-xl text-dark">₹{item.price * item.quantity}</span>
                {item.quantity > 1 && (
                  <div className="text-xs text-slate-400 mt-0.5">₹{item.price} each</div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <button 
          onClick={clearCart} 
          className="text-red-500 font-bold hover:text-red-600 transition flex items-center gap-1.5"
        >
          <Trash2 size={16} />
          Clear Cart
        </button>
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold">Total: ₹{total}</span>
          <Link to="/checkout" className="bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-600 shadow-md transition">
            Go to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
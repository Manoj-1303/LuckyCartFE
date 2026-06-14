import { useState, useEffect } from 'react';
import AuthModule from '../context/AuthContext';
import api from '../services/api';

function Profile() {
  const { currentUser } = AuthModule.useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser || currentUser === "") {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`/api/orders?uid=${currentUser.uid}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-extrabold mb-6 text-slate-900 font-heading"> Welcome back, {currentUser?.displayName || "User"}!</h2>
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
        <h3 className="text-xl font-bold mb-4 text-slate-800 text-left pb-2 border-b border-slate-100"> Account Details </h3>
        <div className="flex flex-col gap-2.5 text-left text-base text-slate-700">
          <p><strong>Name:</strong> {currentUser?.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {currentUser?.email || ""}</p>
          <p><strong>User ID:</strong> <span className="font-mono text-sm bg-slate-50 px-2 py-1 rounded-md border border-slate-150">{currentUser?.uid || ""}</span></p>
        </div> 
        <div className="mt-8 pt-6 border-t border-slate-100 text-left">
          <h3 className="text-xl font-bold mb-4 text-slate-800">Order History</h3>
          {loading ? (
            <p className="text-slate-400 text-sm">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-slate-500 text-sm">No orders placed yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-slate-150 rounded-xl p-4 bg-slate-50">
                  <div className="flex flex-wrap justify-between items-center border-b border-slate-200 pb-2 mb-3 gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Order ID:</span>
                      <span className="text-xs font-mono font-bold text-slate-700 ml-1">#{order._id.substring(18)}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Date:</span>
                      <span className="text-xs font-bold text-slate-700 ml-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Total:</span>
                      <span className="text-sm font-extrabold text-primary ml-1">₹{order.totalPrice}</span>
                    </div>
                  </div> 
                  <div className="flex flex-col gap-2.5">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2.5">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                            <p className="text-slate-400 text-xs mt-0.5">₹{item.price} × {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-700">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 mt-3 pt-2 text-xs text-slate-500">
                    <strong>Shipping to:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
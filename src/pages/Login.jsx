import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import AuthModule from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = AuthModule.useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to sign in. Please check your details.");
    }
  };
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200/80 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Lock size={22} />
        </div>
        <h2 className="text-3xl font-heading font-extrabold text-slate-900">Sign In</h2>
        <p className="text-slate-400 text-sm">Welcome back! Please enter your details.</p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm py-3 px-4 rounded-xl text-center font-medium">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1 text-left">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
              <Mail size={18} />
            </span>
            <input 
              type="email" 
              placeholder="abc@gmail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 outline-hidden focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/45 transition duration-200" 
            />
          </div>
        </div>
        <div className="space-y-1 text-left">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
              <Lock size={18} />
            </span>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 outline-hidden focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/45 transition duration-200" 
            />
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-200 shadow-md hover:shadow-primary/10 hover:-translate-y-0.5 mt-2 cursor-pointer"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-slate-500 text-sm pt-2">
        Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Headphones, RotateCcw, Laptop, Smartphone, Volume2, Watch, Mail, Sparkles, Star } from 'lucide-react';
import Product from '../components/Product';
import sony from '../assets/sony.webp';
import laptopImg from '../assets/laptop.webp';
import mobileImg from '../assets/mobile.avif';
import earbudsImg from '../assets/earbuds.avif';
import accessoriesImg from '../assets/accessories.jpg';
import api from '../services/api';

function Home() {
  const [activeTab, setActiveTab] = useState('featured');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'trending':
        return products.filter(item => item.trending).slice(0, 4);
      case 'new':
        return products.filter(item => item.newArrival).slice(0, 4);
      case 'featured':
      default:
        return products.filter(item => item.featured).slice(0, 4);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const categories = [
    { name: 'Laptops', icon: <Laptop size={32} />, image: laptopImg, count: '4 Items' },
    { name: 'Mobiles', icon: <Smartphone size={32} />, image: mobileImg, count: '4 Items' },
    { name: 'Audio', icon: <Volume2 size={32} />, image: earbudsImg, count: '8 Items' },
    { name: 'Accessories', icon: <Watch size={32} />, image: accessoriesImg, count: '8 Items' },
  ];

  const trustBadges = [
    { icon: <Truck className="text-primary" size={28} />, title: 'Free Shipping', desc: 'On all orders above ₹999' },
    { icon: <ShieldCheck className="text-primary" size={28} />, title: '2-Year Warranty', desc: '100% genuine guarantees' },
    { icon: <Headphones className="text-primary" size={28} />, title: '24/7 Tech Support', desc: 'Expert help at any time' },
    { icon: <RotateCcw className="text-primary" size={28} />, title: '30-Day Returns', desc: 'Hassle-free money back' },
  ];

  return (
    <div className="space-y-16 pb-12">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-3xl overflow-hidden shadow-2xl mt-4">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl"></div>      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full w-fit"
            >
              <Sparkles size={14} /> Next-Gen Technology
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl text-white font-bold leading-tight font-heading"
            >
              The Smart Way to Buy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Premium Tech.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 max-w-xl leading-relaxed"
            >
              Upgrade your setup with our handpicked collection of high-performance laptops, smartphones, sound systems, and smart accessories. Fast delivery and stellar support included.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link 
                to="/products" 
                className="group flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-600 transition shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 duration-200"
              >
                Shop Collection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#categories" 
                className="flex items-center justify-center bg-slate-800/80 text-white border border-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-700 transition hover:-translate-y-0.5 duration-200"
              >
                Browse Categories
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 pt-6 border-t border-slate-800 mt-4"
            >
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-slate-400">
                Trusted by <strong>10k+ customers</strong> nationwide
              </span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={sony} 
                  alt="Premium Tech Gear" 
                  className="w-full h-80 object-cover opacity-90 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-6 pt-20">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">Featured Deal</span>
                  <h3 className="text-xl font-bold text-white mt-1">SonicBuds Studio Pro</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white font-extrabold text-lg">₹24,900</span>
                    <span className="text-xs text-secondary bg-secondary/15 px-2.5 py-1 rounded-full font-bold">Free Shipping</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustBadges.map((badge, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition duration-300"
          >
            <div className="p-3 bg-primary/10 rounded-xl">
              {badge.icon}
            </div>
            <div>
              <h4 className="text-slate-800 font-bold text-base">{badge.title}</h4>
              <p className="text-slate-500 text-sm mt-0.5">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div id="categories" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl md:text-4xl text-dark font-bold">Shop by Category</h2>
          <p className="text-slate-500">Discover premium products tailor-made for your lifestyle.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const routeCategory = cat.name === 'Audio' ? 'Earphones' : (cat.name === 'Accessories' ? 'Smartwatches' : cat.name);
            return (
              <Link 
                to={`/products?category=${routeCategory}`}
                key={idx}
                className="group relative h-60 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="absolute inset-0 bg-dark">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-50 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
                  <div className="p-2 bg-white/10 backdrop-blur-xs rounded-lg w-fit text-white">
                    {cat.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">{cat.count}</span>
                    <h3 className="text-2xl font-bold font-heading mt-1 flex items-center gap-1 group-hover:text-primary transition duration-200">
                      {cat.name}
                      <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300" />
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/15 rounded-full w-fit">
              <ShoppingBag size={12} /> Curated Collection
            </div>
            <h2 className="text-3xl md:text-4xl text-dark font-bold">Popular Tech Deals</h2>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-xl self-start md:self-auto overflow-x-auto">
            {[
              { id: 'featured', label: 'Featured' },
              { id: 'trending', label: 'Trending' },
              { id: 'new', label: 'New Arrivals' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2 rounded-lg text-sm font-bold transition duration-250 ${
                  activeTab === tab.id 
                    ? 'bg-white text-dark shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[350px]">
          {products.length === 0 ? (
            <div className="text-center py-20 text-slate-500">Loading products...</div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {getFilteredProducts().map(product => (
                  <motion.div
                    layout
                    key={product._id} // UPDATED: Now uses MongoDB _id
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Product product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        <div className="text-center pt-4">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 font-bold text-primary hover:text-orange-600 transition"
          >
            Explore All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <Mail size={48} className="mx-auto text-orange-100 opacity-90 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Join the Tech Revolution</h2>
          <p className="text-orange-100 text-lg">
            Subscribe to our newsletter and get updates on new arrivals, exclusive discounts, and professional tech reviews.
          </p>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe} 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow p-4 rounded-xl text-dark outline-hidden focus:ring-2 focus:ring-orange-300 placeholder:text-slate-400 bg-white"
                />
                <button 
                  type="submit" 
                  className="bg-slate-900 text-white font-bold px-6 py-4 rounded-xl hover:bg-slate-800 transition duration-200 shadow-md whitespace-nowrap"
                >
                  Sign Up Free
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/10 border border-white/20 p-4 rounded-xl text-lg font-bold text-center max-w-sm mx-auto"
              >
                🎉 Thank you for subscribing! Check your inbox soon.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Home;
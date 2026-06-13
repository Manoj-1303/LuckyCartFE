import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import AuthModule from '../context/AuthContext';
import CartModule from '../context/CartContext';

function Navbar() {
  const { currentUser, logout } = AuthModule.useAuth();
  const { cart } = CartModule.useCart();
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearchVal(searchParams.get("search") || "");
  }, [searchParams]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal)}`);
    } else {
      navigate('/products');
    }
    setIsOpen(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (location.pathname === '/products') {
      navigate(`/products?search=${encodeURIComponent(val)}`, { replace: true });
    }
  };

  const isActiveLink = (path, category = null) => {
    if (location.pathname !== path) return false;
    if (category) {
      return searchParams.get("category") === category;
    }
    return !searchParams.get("category"); 
  };

  return (
    <nav className="bg-slate-950/95 backdrop-blur-md border-b border-slate-900 text-slate-100 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto p-4 flex gap-4 items-center justify-between">
        
        <Link to="/" className="text-2xl font-heading font-extrabold text-white tracking-wider shrink-0 select-none">
          Lucky<span className="text-primary">Cart</span>
        </Link>

        <div className="hidden lg:flex gap-6 items-center font-bold text-sm tracking-wide text-slate-300 shrink-0">
          <Link 
            to="/products" 
            className={`hover:text-primary transition duration-150 ${
              isActiveLink('/products') ? 'text-primary' : ''
            }`}
          >
            All Products
          </Link>
          <Link 
            to="/products?category=Laptops" 
            className={`hover:text-primary transition duration-150 ${
              isActiveLink('/products', 'Laptops') ? 'text-primary' : ''
            }`}
          >
            Laptops
          </Link>
          <Link 
            to="/products?category=Mobiles" 
            className={`hover:text-primary transition duration-150 ${
              isActiveLink('/products', 'Mobiles') ? 'text-primary' : ''
            }`}
          >
            Mobiles
          </Link>
          <Link 
            to="/products?category=Earphones" 
            className={`hover:text-primary transition duration-150 ${
              isActiveLink('/products', 'Earphones') ? 'text-primary' : ''
            }`}
          >
            Audio
          </Link>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex relative flex-grow max-w-sm xl:max-w-md mx-4 select-none">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search any electronics..."
            value={searchVal}
            onChange={handleSearchChange}
            className="w-full bg-slate-900 border border-slate-800/80 rounded-xl py-2 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all duration-200"
          />
        </form>

        <div className="flex gap-4 items-center shrink-0 select-none">
          
          <Link 
            to="/cart" 
            className={`relative p-2 rounded-lg hover:bg-slate-900 hover:text-primary transition duration-150 ${
              location.pathname === '/cart' ? 'text-primary bg-slate-900' : 'text-slate-300'
            }`}
          >
            <ShoppingCart size={22} />
            {totalItemsCount > 0 ? (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-extrabold rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-slate-950 shadow-md">
                {totalItemsCount}
              </span>
            ) : ("")}
          </Link>

          {currentUser !== "" ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/profile" 
                className={`p-2 rounded-lg hover:bg-slate-900 hover:text-primary transition duration-150 ${
                  location.pathname === '/profile' ? 'text-primary bg-slate-900' : 'text-slate-300'
                }`}
                title="Profile"
              >
                <User size={22} />
              </Link>
              <button 
                onClick={logout} 
                className="hidden sm:inline-block bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold px-4 py-2 rounded-xl border border-slate-800 transition duration-150 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-primary hover:bg-orange-600 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition duration-150 shadow-md hover:shadow-primary/20 hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}

          <button 
            onClick={toggleMenu} 
            className="md:hidden text-slate-300 hover:text-white focus:outline-hidden p-1.5 rounded-lg hover:bg-slate-900 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {isOpen ? (
        <div className="md:hidden bg-slate-950/98 text-slate-100 p-5 flex flex-col gap-4 font-bold border-t border-slate-900 select-none">
          
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchVal}
              onChange={handleSearchChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-primary"
            />
          </form>

          <div className="flex flex-col gap-3.5 text-sm font-semibold text-slate-300 pt-2 border-t border-slate-900">
            <Link 
              to="/products" 
              onClick={toggleMenu}
              className={isActiveLink('/products') ? 'text-primary' : ''}
            >
              All Products
            </Link>
            <Link 
              to="/products?category=Laptops" 
              onClick={toggleMenu}
              className={isActiveLink('/products', 'Laptops') ? 'text-primary' : ''}
            >
              Laptops
            </Link>
            <Link 
              to="/products?category=Mobiles" 
              onClick={toggleMenu}
              className={isActiveLink('/products', 'Mobiles') ? 'text-primary' : ''}
            >
              Smartphones
            </Link>
            <Link 
              to="/products?category=Earphones" 
              onClick={toggleMenu}
              className={isActiveLink('/products', 'Earphones') ? 'text-primary' : ''}
            >
              Audio Gear
            </Link>
          </div>

          <div className="border-t border-slate-900 pt-4 flex flex-col gap-3 text-sm">
            <Link 
              to="/cart" 
              onClick={toggleMenu} 
              className={`flex items-center justify-between ${
                location.pathname === '/cart' ? 'text-primary' : 'text-slate-300'
              }`}
            >
              <span>Shopping Cart</span>
              <span className="bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full text-xs text-slate-400 font-bold">
                {totalItemsCount} items
              </span>
            </Link>

            {currentUser !== "" ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={toggleMenu} 
                  className={location.pathname === '/profile' ? 'text-primary' : 'text-slate-300'}
                >
                  My Profile
                </Link>
                <button 
                  onClick={() => { logout(); toggleMenu(); }} 
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-xl text-left font-bold cursor-pointer mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={toggleMenu} 
                className="bg-primary text-white py-2.5 rounded-xl text-center font-bold mt-2"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      ) : ("")}
    </nav>
  );
}

export default Navbar;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthModule from './context/AuthContext';
import CartModule from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouteWrapper from './components/Route';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function AppLayout() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/checkout" element={<RouteWrapper content={<Checkout />} />} />
            <Route path="/profile" element={<RouteWrapper content={<Profile />} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthModule.AuthProvider content={
      <CartModule.CartProvider content={
        <AppLayout />
      } />
    } />
  );
}

export default App;
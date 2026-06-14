import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import CartModule from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = CartModule.useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl font-bold">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4 text-dark">Product Not Found</h2>
        <p className="text-lg text-slate-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="bg-primary text-white px-6 py-3 rounded-lg font-bold">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Link 
        to="/products" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition font-bold mb-8"
      >
        <ArrowLeft size={18} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-lg">
        
        <div className="rounded-xl overflow-hidden shadow-md border border-slate-100 h-96 flex items-center justify-center bg-slate-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-102 transition duration-500" 
          />
        </div>
        
        <div className="flex flex-col justify-between py-2 text-left">
          <div className="space-y-4">
            <span className="inline-block px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 rounded-full">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <div className="text-3xl font-black text-slate-900 pt-2">
              ₹{product.price}
            </div>

            <hr className="border-slate-100 my-4" />

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="pt-8 md:pt-0">
            <button 
              onClick={handleAdd}
              disabled={isAdded}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition duration-200 shadow-md cursor-pointer ${
                isAdded 
                  ? "bg-secondary text-white shadow-secondary/10" 
                  : "bg-primary text-white hover:bg-orange-600 shadow-primary/10 hover:-translate-y-0.5"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={18} />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartModule from '../context/CartContext';

function Product(props) {
  const { addToCart } = CartModule.useCart();
  const product = props.product;
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-slate-100 flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="block overflow-hidden shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" 
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`} className="hover:text-primary transition-colors">
          <h3 className="text-xl text-dark font-bold line-clamp-1">{product.name}</h3>
        </Link>
        
        <p className="text-slate-500 my-2 line-clamp-2 flex-grow text-sm">{product.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <button 
            onClick={handleAdd}
            disabled={isAdded}
            className={`px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer text-sm ${
              isAdded 
                ? "bg-secondary text-white" 
                : "bg-primary text-white hover:bg-orange-600"
            }`}
          >
            {isAdded ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Product from '../components/Product';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const qSearch = searchParams.get("search") || "";
    const qCategory = searchParams.get("category") || "All";
    const qSort = searchParams.get("sort") || "Default";
    
    setSearchText(qSearch);
    setSelectedCategory(qCategory);
    setSortOrder(qSort);
  }, [searchParams]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val) next.set("search", val);
      else next.delete("search");
      return next;
    });
  };
  const handleCategoryChange = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val !== "All") next.set("category", val);
      else next.delete("category");
      return next;
    });
  };
  const handleSortChange = (val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val !== "Default") next.set("sort", val);
      else next.delete("sort");
      return next;
    });
  };
  const filteredItems = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const sortedAndFilteredItems = filteredItems.sort((a, b) => {
    if (sortOrder === "LowToHigh") {
      return a.price - b.price;
    }
    if (sortOrder === "HighToLow") {
      return b.price - a.price;
    }
    return 0; 
  });

  return (
    <div className="py-6">
      <h2 className="text-4xl text-dark mb-8 font-bold">All Products</h2>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4">     
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-grow p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
        />

        <select 
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary bg-white"
        >
          <option value="All">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Earphones">Earphones</option>
          <option value="Powerbanks">Powerbanks</option>
          <option value="Smartwatches">Smartwatches</option>
          <option value="Bluetooth Speakers">Bluetooth Speakers</option>
        </select>

        <select 
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary bg-white"
        >
          <option value="Default">Sort by: Default</option>
          <option value="LowToHigh">Price: Low to High</option>
          <option value="HighToLow">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xl">Loading products...</div>
      ) : sortedAndFilteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedAndFilteredItems.map(item => (
            <Product key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl text-slate-500">No products found. Try changing your filters!</h3>
        </div>
      )}
    </div>
  );
}

export default Products;
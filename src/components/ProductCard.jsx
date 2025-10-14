import React from 'react';
// Assuming you are using a library like react-icons
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Example product prop: { name: 'Organic Puppy Food', price: '₹1,250', image: 'url', category: 'Food' }
const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-2xl shadow-lg shadow-grey/50 overflow-hidden flex flex-col group">
      <div className="relative overflow-hidden">
          {/* Change: Use product.imageUrl from backend */}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
            loading="lazy" 
          />
          {product.stockQuantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <span className="text-white font-bold text-lg uppercase tracking-wider">Out of Stock</span>
            </div>
          )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
            {/* Change: Use product.name from backend */}
          <h3 className="font-semibold text-text-dark flex-grow">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
                {/* Change: Format price from backend number */}
              <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
              {/* Note: 'badge' is not in the backend model and has been removed. */}
          </div>
          <button 
              onClick={(e) => handleAddToCart(e, product)}
              className="mt-4 w-full flex bg-primary items-center justify-center gap-2 text-white rounded-lg py-2 font-semibold hover:bg-secondary transition-colors disabled:bg-grey-400 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={product.stockQuantity === 0}
          >
            <FiShoppingCart />
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
      </div>
  </Link>
  );
};

export default ProductCard;
import React from 'react';
// Assuming you are using a library like react-icons
import { FiShoppingCart } from 'react-icons/fi';

// Example product prop: { name: 'Organic Puppy Food', price: '₹1,250', image: 'url', category: 'Food' }
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <div className="bg-brand-light rounded-xl mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-500 p-4"
        />
      </div>
      <p className="text-text-light text-sm">{product.category}</p>
      <h4 className="text-lg font-semibold text-text-dark my-1">{product.name}</h4>
      <p className="text-xl font-bold text-brand-primary mb-4">{product.price}</p>
      <button className="w-full flex items-center justify-center gap-2 bg-brand-secondary text-text-dark font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105">
        <FiShoppingCart />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
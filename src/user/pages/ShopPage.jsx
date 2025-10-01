// src/pages/ShopPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';

const sampleProducts = [
  { id: 101, title: "Premium Dog Food 10kg", price: "₹1,499", badge: "Best Seller", img: "/assets/Dog-food.jpg", rating: 4.8, reviews: 112, description: "A balanced, protein-rich formula designed for adult dogs to support muscle growth and a healthy coat. Made with real chicken and whole grains." },
  { id: 102, title: "Eco-Friendly Cat Litter", price: "₹599", badge: "Eco", img: "/assets/Cat-litter.jpg", rating: 4.6, reviews: 88, description: "Made from 100% biodegradable materials, this cat litter offers superior odor control while being gentle on your cat's paws and the environment." },
  { id: 103, title: "Comfy Pet Bed (Medium)", price: "₹2,299", badge: "New", img: "/assets/Comfy-pet-bed.jpg", rating: 4.9, reviews: 45, description: "An orthopedic memory foam bed that provides ultimate comfort and support for your pet. The cover is machine-washable and durable." },
  { id: 104, title: "Interactive Feather Toy", price: "₹299", badge: "Top Rated", img: "/assets/Feather-toy.jpeg", rating: 4.7, reviews: 205, description: "Engage your cat's natural hunting instincts with this interactive feather wand. Durable, safe, and provides hours of fun." },
  { id: 105, title: "Premium Dog Food 10kg", price: "₹1,499", badge: "Best Seller", img: "/assets/Dog-food.jpg", rating: 4.8, reviews: 112, description: "A balanced, protein-rich formula designed for adult dogs to support muscle growth and a healthy coat. Made with real chicken and whole grains." },
];

export default function ShopPage() {
  const handleAddToCart = (e, productTitle) => {
    e.preventDefault(); 
    alert(`${productTitle} added to cart!`);
  };

  return (
    // Removed background color, using default
    <PageContainer>
      <h1 className="text-3xl font-bold text-primary mb-4">Shop Essentials</h1>
      <p className="text-text-medium mb-8">Quality food, toys and supplies - curated for every stage of your pet’s life.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProducts.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-2xl shadow-lg shadow-grey/50 overflow-hidden flex flex-col group">
            <div className="overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-text-dark flex-grow">{p.title}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-lg">{p.price}</span>
                {/* Changed bg-highlight to bg-ivory */}
                <span className="text-xs px-2 py-1 rounded-md bg-ivory text-primary font-semibold">{p.badge}</span>
              </div>
              <button 
                onClick={(e) => handleAddToCart(e, p.title)}
                className="mt-4 w-full bg-primary text-white rounded-lg py-2 font-semibold hover:bg-secondary transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer'; // Using the consistent PageContainer
import { BsHeartFill } from 'react-icons/bs';

// --- Sample Data (In a real app, this would come from the user's account) ---
const sampleFavoritePets = [
  { id: 11, name: "Buddy", type: "Dog", img: "/assets/Dog-1.jpg", age: "2 yrs", short: "Playful, vaccinated." },
  { id: 13, name: "Pip", type: "Rabbit", img: "/assets/Rabbit-1.jpg", age: "6 mo", short: "Gentle companion." },
];

const sampleFavoriteProducts = [
  { id: 103, title: "Comfy Pet Bed (Medium)", price: "₹2,299", badge: "New", img: "/assets/Comfy-pet-bed.jpg" },
  { id: 104, title: "Interactive Feather Toy", price: "₹299", badge: "Top Rated", img: "/assets/Feather-toy.jpeg" },
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('pets'); // 'pets' or 'products'
  const [favoritePets, setFavoritePets] = useState(sampleFavoritePets);
  const [favoriteProducts, setFavoriteProducts] = useState(sampleFavoriteProducts);

  const handleRemovePet = (petId) => {
    setFavoritePets(favoritePets.filter(pet => pet.id !== petId));
  };

  const handleRemoveProduct = (productId) => {
    setFavoriteProducts(favoriteProducts.filter(product => product.id !== productId));
  };

  const EmptyState = ({ type }) => (
    <div className="text-center bg-ivory p-10 rounded-2xl">
      <h2 className="text-xl font-semibold text-text-dark">No Favorite {type} Yet</h2>
      <p className="text-text-medium mt-2 mb-6">
        Click the heart icon on any {type === 'Pets' ? 'pet' : 'product'} to save it here.
      </p>
      <Link 
        to={type === 'Pets' ? '/find-a-friend' : '/shop'} 
        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
      >
        Discover {type}
      </Link>
    </div>
  );

  return (
    <PageContainer>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Your Favorites</h1>
        <p className="text-text-medium mt-2">All your saved pets and products in one place.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-accent mb-8">
        <button 
          onClick={() => setActiveTab('pets')}
          className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'pets' ? 'border-b-2 border-primary text-primary' : 'text-text-medium'}`}
        >
          Favorite Pets
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'products' ? 'border-b-2 border-primary text-primary' : 'text-text-medium'}`}
        >
          Favorite Products
        </button>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === 'pets' && (
          <div>
            {favoritePets.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favoritePets.map(pet => (
                  <div key={pet.id} className="relative group bg-white rounded-2xl shadow-lg overflow-hidden">
                    <button onClick={() => handleRemovePet(pet.id)} className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-red-500 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <BsHeartFill size={18}/>
                    </button>
                    <Link to={`/pet/${pet.id}`} className="block">
                      <img src={pet.img} alt={pet.name} className="w-full h-48 object-cover"/>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-primary">{pet.name}</h3>
                        <p className="text-sm text-text-medium">{pet.type} • {pet.age}</p>
                        <p className="mt-2 text-sm text-text-dark">{pet.short}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : <EmptyState type="Pets" />}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            {favoriteProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {favoriteProducts.map(product => (
                  <div key={product.id} className="relative group bg-white rounded-2xl shadow-lg overflow-hidden">
                     <button onClick={() => handleRemoveProduct(product.id)} className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-red-500 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <BsHeartFill size={18}/>
                    </button>
                    <Link to={`/product/${product.id}`} className="block">
                      <img src={product.img} alt={product.title} className="w-full h-48 object-cover"/>
                      <div className="p-4">
                        <h3 className="font-semibold text-text-dark">{product.title}</h3>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-primary font-bold text-lg">{product.price}</span>
                          <span className="text-xs px-2 py-1 rounded-md bg-ivory text-primary font-semibold">{product.badge}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : <EmptyState type="Products" />}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
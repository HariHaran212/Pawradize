import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsDash, BsTrash } from 'react-icons/bs';
import PageContainer from '../../components/PageContainer';

// Sample data - in a real app, this would come from a global state (like Context or Redux)
const initialCartItems = [
  { id: 101, name: "Premium Dog Food 10kg", img: "/assets/Dog-food.jpg", price: 1499, quantity: 1 },
  { id: 104, name: "Interactive Feather Toy", img: "/assets/Feather-toy.jpeg", price: 299, quantity: 2 },
  { id: 103, name: "Comfy Pet Bed (Medium)", img: "/assets/Comfy-pet-bed.jpg", price: 2299, quantity: 1 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to handle quantity changes
  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } // Ensures quantity doesn't go below 1
        : item
    ));
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 ? 0 : 50; // Example: Free shipping over ₹2,000
  const total = subtotal + shippingFee;

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg shadow-accent/50">
          <h2 className="text-2xl font-semibold text-text-dark">Your cart is empty!</h2>
          <p className="text-text-medium mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-secondary transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-md shadow-accent/30">
                <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-semibold text-text-dark">{item.name}</h3>
                  <p className="text-sm text-text-medium">Price: ₹{item.price.toLocaleString()}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-ivory p-2 rounded-lg">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="text-primary hover:text-secondary disabled:opacity-50" disabled={item.quantity <= 1}>
                    <BsDash size={20} />
                  </button>
                  <span className="font-bold w-8 text-center">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="text-primary hover:text-secondary">
                    <BsPlus size={20} />
                  </button>
                </div>

                <p className="font-bold text-lg text-primary w-24 text-center sm:text-right">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
                
                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-2">
                  <BsTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-accent/50 sticky top-20">
              <h2 className="text-xl font-bold text-primary mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-text-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text-medium">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee.toLocaleString()}`}</span>
                </div>
                <hr className="my-2 border-accent" />
                <div className="flex justify-between font-bold text-lg text-text-dark">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <Link
                to="/checkout">
                <button 
                  className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
                  Proceed to Buy
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
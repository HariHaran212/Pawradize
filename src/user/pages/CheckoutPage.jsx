import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCreditCard2Front, BsCashCoin, BsQrCode } from 'react-icons/bs';
import PageContainer from '../../components/PageContainer';

// Sample data that would come from your cart state
const orderData = {
  items: [
    { id: 101, name: "Premium Dog Food 10kg", price: 1499, quantity: 1 },
    { id: 104, name: "Interactive Feather Toy", price: 299, quantity: 2 },
  ],
  subtotal: 2097,
  shipping: 0,
  tax: 377.46, // Example 18% GST
};

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order Placed!\n\nShipping to: ${formData.fullName}, ${formData.address}\nPayment Method: ${paymentMethod}`);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // 1. Send order details to YOUR backend to create an order
  //   const response = await fetch('/api/create-order', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ amount: total }), // Send the final amount
  //   });
  //   const order = await response.json();

  //   // 2. Use the gateway's library on the frontend
  //   const options = {
  //       key: "YOUR_PUBLIC_GATEWAY_KEY", // Get this from your gateway dashboard
  //       amount: order.amount,
  //       currency: "INR",
  //       name: "Pawradise",
  //       description: "Your Order from Pawradise",
  //       order_id: order.id, // The order_id from your backend
  //       handler: function (response) {
  //           // This function is called after a successful payment
  //           alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
  //           // Here you would verify the payment on your backend and redirect the user
  //           // window.location.href = "/order-success";
  //       },
  //       prefill: {
  //           name: formData.fullName,
  //           contact: formData.phone,
  //       },
  //       theme: {
  //           color: "#8EBC38" // Your primary brand color
  //       }
  //   };

  //   // This creates and opens the payment gateway's modal
  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
	// };

  const total = orderData.subtotal + orderData.shipping + orderData.tax;

  return (
    <PageContainer>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Checkout</h1>
        <p className="text-text-medium mb-8">Complete your order by providing your details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-10">
        {/* Left Column: Form & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Delivery Form */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-accent/50">
            <h2 className="text-xl font-bold text-text-dark mb-4">Shipping Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">Full Name</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary outline-none" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold mb-2">Street Address</label>
                <input type="text" id="address" value={formData.address} onChange={handleInputChange} className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary outline-none" required />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-semibold mb-2">City</label>
                <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary outline-none" required />
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-semibold mb-2">PIN Code</label>
                <input type="text" id="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary outline-none" required />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary outline-none" required />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-accent/50">
            <h2 className="text-xl font-bold text-text-dark mb-4">Payment Method</h2>
            <div className="space-y-3">
              {/* Card Payment */}
              <div onClick={() => setPaymentMethod('card')} className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary ring-2 ring-primary' : 'border-accent'}`}>
                <div className="flex items-center">
                  <BsCreditCard2Front className="mr-3 text-primary" size={24}/>
                  <span className="font-semibold">Credit / Debit Card</span>
                </div>
                {paymentMethod === 'card' && (
                  <div className="mt-4 grid sm:grid-cols-3 gap-3">
                    <input className="sm:col-span-3 border border-accent rounded p-2 outline-none" placeholder="Card Number" />
                    <input className="border border-accent rounded p-2 outline-none" placeholder="MM / YY" />
                    <input className="border border-accent rounded p-2 outline-none" placeholder="CVC" />
                  </div>
                )}
              </div>
              {/* UPI */}
              <div onClick={() => setPaymentMethod('upi')} className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary ring-2 ring-primary' : 'border-accent'}`}>
                  <div className="flex items-center">
                  <BsQrCode className="mr-3 text-primary" size={24}/>
                  <span className="font-semibold">UPI</span>
                </div>
              </div>
                {/* COD */}
              <div onClick={() => setPaymentMethod('cod')} className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary ring-2 ring-primary' : 'border-accent'}`}>
                <div className="flex items-center">
                  <BsCashCoin className="mr-3 text-primary" size={24}/>
                  <span className="font-semibold">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bill Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-accent/50 sticky top-20">
            <h2 className="text-xl font-bold text-primary mb-4">Your Bill</h2>
            <div className="space-y-3">
              {orderData.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-text-medium">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <hr className="my-4 border-accent" />
            <div className="space-y-3">
              <div className="flex justify-between text-text-medium">
                <span>Subtotal</span>
                <span>₹{orderData.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-text-medium">
                <span>Shipping</span>
                <span>{orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping.toLocaleString()}`}</span>
              </div>
                <div className="flex justify-between text-text-medium">
                <span>Taxes (GST)</span>
                <span>₹{orderData.tax.toLocaleString()}</span>
              </div>
              <hr className="my-2 border-accent" />
              <div className="flex justify-between font-bold text-lg text-text-dark">
                <span>Grand Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <button type="submit" className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link, useParams } from 'react-router-dom';
import { BsPrinter } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';

// More detailed sample data for a single order view
const sampleOrders = [
  { 
    id: 'PAW-84322', 
    date: '2025-09-26', 
    status: 'Processing',
    customer: {
        name: 'Priya K.',
        email: 'priya.k@example.com',
        phone: '+91 98765 43211',
        shippingAddress: '456 Park Avenue, R.S. Puram, Coimbatore, 641002',
    },
    payment: {
        method: 'Credit Card',
        status: 'Paid',
    },
    items: [
      { id: 101, name: "Premium Dog Food 10kg", img: "/assets/Dog-food.jpg", price: 1499, quantity: 1 },
      { id: 104, name: "Interactive Feather Toy", img: "/assets/Feather-toy.jpeg", price: 299, quantity: 1 },
    ],
    subtotal: 1798,
    shipping: 0,
    tax: 323.64,
    total: 2121.64
  },
  // ... other detailed orders
];

const statusStyles = {
    Processing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Shipped: 'bg-blue-100 text-blue-800 border-blue-300',
    Delivered: 'bg-green-100 text-green-800 border-green-300',
    Cancelled: 'bg-red-100 text-red-800 border-red-300',
};

export default function ViewOrders() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const foundOrder = sampleOrders.find(o => o.id === id);
    setOrder(foundOrder);
  }, [id]);

  const handleStatusChange = (e) => {
    setOrder(prev => ({ ...prev, status: e.target.value }));
    // Here you would typically make an API call to update the status
  };

  if (!order) {
    return (
      <AdminPageContainer>
        <div className="p-6 text-center"><h2 className="text-xl font-semibold">Order not found.</h2></div>
      </AdminPageContainer>
    );
  }

  return (
    <AdminPageContainer>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <Link to="/admin/orders" className="text-sm text-secondary hover:underline">← Back to Orders</Link>
            <h1 className="text-2xl font-bold text-primary">Order #{order.id}</h1>
          </div>
          <button className="flex items-center gap-2 bg-ivory text-text-dark font-semibold px-4 py-2 rounded-lg border border-accent hover:bg-accent transition-colors">
            <BsPrinter /> Print Invoice
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
            {/* Order Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-accent pb-6 mb-6">
                <div><p className="text-sm text-text-medium">Order Date</p><p className="font-semibold">{order.date}</p></div>
                <div><p className="text-sm text-text-medium">Customer</p><p className="font-semibold">{order.customer.name}</p></div>
                <div><p className="text-sm text-text-medium">Payment Status</p><p className="font-semibold text-green-600">{order.payment.status}</p></div>
                <div>
                    <label className="text-sm text-text-medium">Order Status</label>
                    <select value={order.status} onChange={handleStatusChange} className={`w-full mt-1 p-1 text-sm font-semibold rounded-md border-2 focus:ring-grey-300 ${statusStyles[order.status]}`}>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h3 className="font-semibold text-text-dark mb-2">Customer Details</h3>
                    <p className="text-sm">{order.customer.name}</p>
                    <p className="text-sm">{order.customer.email}</p>
                    <p className="text-sm">{order.customer.phone}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-text-dark mb-2">Shipping Address</h3>
                    <p className="text-sm">{order.customer.shippingAddress}</p>
                </div>
            </div>

            {/* Items Table */}
            <div>
                <h3 className="font-semibold text-text-dark mb-4">Items Ordered</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-ivory">
                            <tr>
                                <th className="p-3 text-left font-semibold">Product</th>
                                <th className="p-3 text-right font-semibold">Price</th>
                                <th className="p-3 text-center font-semibold">Quantity</th>
                                <th className="p-3 text-right font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.id} className="border-b border-accent">
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={item.img} alt={item.name} className="w-12 h-12 rounded-md object-cover" loading="lazy" />
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="p-3 text-right">₹{item.price.toLocaleString()}</td>
                                    <td className="p-3 text-center">{item.quantity}</td>
                                    <td className="p-3 text-right font-medium">₹{(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Totals */}
            <div className="flex justify-end mt-6">
                <div className="w-full max-w-xs space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-text-medium">Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-text-medium">Shipping</span><span>{order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}</span></div>
                    <div className="flex justify-between"><span className="text-text-medium">Tax (GST)</span><span>₹{order.tax.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold text-lg text-primary border-t border-accent pt-2 mt-2"><span>Grand Total</span><span>₹{order.total.toLocaleString()}</span></div>
                </div>
            </div>
        </div>
      </div>
    </AdminPageContainer>
  );
}
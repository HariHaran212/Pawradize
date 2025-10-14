import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link, useParams } from 'react-router-dom';
import { BsPrinter } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { Mail, MapPin, Phone } from 'lucide-react';

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
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState('');     // Add error state

  useEffect(() => {
    const fetchOrder = async () => {
        try {
            setLoading(true);
            // Use your apiClient to fetch the specific order
            const response = await apiClient.get(`/api/admin/orders/${id}`);
            setOrder(response.data.data);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to load order details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchOrder();
  }, [id]); // Re-fetch if the order ID changes

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const originalStatus = order.status; // Keep the original status in case of an error

    // 1. Optimistic UI Update: Update the state immediately for a responsive feel
    setOrder(prev => ({ ...prev, status: newStatus }));

    try {
        // 2. Make the API call to your backend
        await apiClient.patch(
            `/api/admin/orders/${order.id}/status`, 
            null, // PATCH requests can have a null body
            { params: { newStatus } } // Send the new status as a query parameter
        );
        // You could add a success notification here (e.g., using a toast library)
    } catch (err) {
        // 3. If the API call fails, revert the change and show an error
        alert('Failed to update status. Please try again.');
        console.error(err);
        setOrder(prev => ({ ...prev, status: originalStatus }));
    }
  };

  // Add loading and error handling before rendering
  if (loading) {
      return <AdminPageContainer><div className="p-6 text-center">Loading order...</div></AdminPageContainer>;
  }

  if (error) {
      return <AdminPageContainer><div className="p-6 text-center text-red-500">{error}</div></AdminPageContainer>;
  }

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
                <div><p className="text-sm text-text-medium">Order Date</p><p className="font-semibold">{order.orderDate }</p></div>
                <div><p className="text-sm text-text-medium">Customer</p><p className="font-semibold">{order.customer.customerName}</p></div>
                {/* <div><p className="text-sm text-text-medium">Payment Status</p><p className="font-semibold text-green-600">{order.payment.status}</p></div> */}
                <div>
                    <label className="text-sm text-text-medium">Order Status</label>
                    <select 
                      value={order.status} 
                      onChange={handleStatusChange} 
                      className={`w-full mt-1 p-1 ...`}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <h3 className="font-semibold text-text-dark mb-2">Customer Details</h3>
                    <p className="text-sm">{order.customer.customerName}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Mail className="text-primary" size={18} />
                      <a
                        href={order.customer.email ? `mailto:${order.customer.email}` : null} className="text-sm"
                      >
                        {order.customer.email || "N/A"}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Phone className="text-primary" size={18} />
                      <a
                        href={order.customer.phoneNumber ? `tel:${order.customer.phoneNumber}` : null} className="text-sm"
                      >
                        {order.customer.phoneNumber || "N/A"}
                      </a>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 my-2">
                      <MapPin className="text-primary" size={18} />
                      <h3 className="font-semibold text-text-dark">Shipping Address</h3>
                    </div>
                    <p className="text-sm">{order.shippingAddress.street}</p>
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
                            {order.orderItems.map(item => (
                                <tr key={item.productId} className="border-b border-accent">
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={item.imageUrl} alt={item.productName} className="w-12 h-12 rounded-md object-cover" loading="lazy" />
                                        <span>{item.productName}</span>
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
                    <div className="flex justify-between"><span className="text-text-medium">Shipping</span><span>{order.shippingFee === 0 ? 'Free' : `₹${order.shippingFee.toLocaleString()}`}</span></div>
                    <div className="flex justify-between"><span className="text-text-medium">Tax (GST)</span><span>₹{order.taxes.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold text-lg text-primary border-t border-accent pt-2 mt-2"><span>Grand Total</span><span>₹{order.totalAmount.toLocaleString()}</span></div>
                </div>
            </div>
        </div>
      </div>
    </AdminPageContainer>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsPrinter } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { formatDateTime, getOrderStatusStyles } from '../../utils/helper';

export default function ViewOrders() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { basePath } = useUser();

  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
        try {
            setLoading(true);
            // Use your apiClient to fetch the specific order
            const response = await apiClient.get(`/api/admin/orders/${id}`);
            setOrder(response.data.data);
            setSelectedStatus(response.data.data.status);
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to load order details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchOrder();
  }, [id]);

  const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
  };

  const handleSaveChanges = async () => {
      setIsSaving(true);
      try {
          const response = await apiClient.patch(
              `/api/admin/orders/${order.id}/status`,
              null,
              { params: { newStatus: selectedStatus } }
          );
          // Update the main order object with the successfully saved status
          setOrder(response.data.data);
          alert('Status updated successfully!');
      } catch (err) {
          alert('Failed to update status. Please try again.');
          // Revert the dropdown to the original status on failure
          setSelectedStatus(order.status);
      } finally {
          setIsSaving(false);
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

  const hasStatusChanged = order && selectedStatus !== order.status;

  return (
    <AdminPageContainer>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <Link to={`${basePath}/orders`} className="text-sm text-secondary hover:underline">← Back to Orders</Link>
            <h1 className="text-2xl font-bold text-primary">Order #{order.id}</h1>
          </div>
          <button 
            className="flex items-center gap-2 bg-ivory text-text-dark font-semibold px-4 py-2 rounded-lg border border-accent hover:bg-accent transition-colors"
          >
            <BsPrinter /> Print Invoice
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md">
            {/* Order Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-accent pb-6 mb-6">
                <div><p className="text-sm text-text-medium">Order Date</p><p className="font-semibold">{formatDateTime(order.orderDate)}</p></div>
                <div><p className="text-sm text-text-medium">Customer</p><p className="font-semibold">{order.customer.customerName}</p></div>
                {/* <div><p className="text-sm text-text-medium">Payment Status</p><p className="font-semibold text-green-600">{order.payment.status}</p></div> */}
                <div>
                    <label className="text-sm text-text-medium">Order Status</label>
                    <select 
                      value={selectedStatus} 
                      onChange={handleStatusChange} 
                      className={`w-full mt-1 p-1 text-sm font-semibold rounded-md border-2 focus:ring-gray-300 ${getOrderStatusStyles(selectedStatus)}`}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
                
                {hasStatusChanged && (
                  <div className="flex justify-center items-center pt-6">
                    <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="h-10 w-40 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
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
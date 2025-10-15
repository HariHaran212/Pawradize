// src/pages/OrderDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { getStatusStyles, formatDate } from './OrderHistoryPage';
import PageContainer from '../../components/PageContainer';

export default function OrderDetailPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await apiClient.get(`/api/orders/${orderId}`);
                setOrder(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Could not load order details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (loading) return <PageContainer><p className="text-center">Loading order details...</p></PageContainer>;
    if (error) return <PageContainer><p className="text-center text-red-500">{error}</p></PageContainer>;
    if (!order) return null;

    return (
        <PageContainer>
            <Link to="/orders" className="text-primary hover:underline mb-6 inline-block">← Back to My Orders</Link>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <header className="flex flex-col md:flex-row justify-between md:items-center border-b border-accent pb-6 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Order Details</h1>
                        <p className="text-sm text-text-medium mt-1">Order #{order.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-text-medium">Placed on: {formatDate(order.orderDate)}</p>
                        <span className={`mt-1 inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                </header>
                
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold">Items Ordered ({order.orderItems.length})</h2>
                        {order.orderItems.map(item => (
                            <div key={item.productId} className="flex gap-4 border-b border-accent pb-4">
                                <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.productName}</p>
                                    <p className="text-sm text-text-medium">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                            <div className="text-text-medium text-sm">
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                            <div className="space-y-2 text-sm text-text-medium">
                                <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>₹{order.shippingFee.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Taxes</span><span>₹{order.taxes.toFixed(2)}</span></div>
                                <hr className="my-2 border-accent" />
                                <div className="flex justify-between font-bold text-lg text-text-dark"><span>Grand Total</span><span>₹{order.totalAmount.toLocaleString()}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

// Helper functions (can be in a separate utils file)
// const getStatusStyles = (status) => { /* ... */ };
// const formatDate = (dateString) => { /* ... */ };
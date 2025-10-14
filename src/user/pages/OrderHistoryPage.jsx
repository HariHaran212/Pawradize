// src/pages/OrderHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import PageContainer from '../../components/PageContainer';

export const getStatusStyles = (status) => {
    switch (status) {
        case 'DELIVERED': return 'bg-green-100 text-green-800';
        case 'SHIPPED': return 'bg-blue-100 text-blue-800';
        case 'PENDING': return 'bg-yellow-100 text-yellow-800';
        case 'CANCELLED': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiClient.get('/api/orders');
                // Sort orders to show the most recent first
                const sortedOrders = response.data.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setOrders(sortedOrders);
            } catch (err) {
                setError('Could not fetch your order history.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <PageContainer><p className="text-center">Loading your orders...</p></PageContainer>;
    if (error) return <PageContainer><p className="text-center text-red-500">{error}</p></PageContainer>;

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">My Orders</h1>
            {orders.length === 0 ? (
                <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-semibold">You have no past orders.</h2>
                    <Link to="/shop" className="btn-primary mt-6">Start Shopping</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                            <div>
                                <p className="text-sm text-text-medium">Order ID</p>
                                <p className="font-semibold text-xs md:text-sm truncate">#{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">Date Placed</p>
                                <p className="font-semibold">{formatDate(order.orderDate)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">Total Amount</p>
                                <p className="font-bold text-primary">₹{order.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 col-span-2 md:col-span-1 md:justify-end">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles(order.status)}`}>
                                    {order.status}
                                </span>
                                <Link to={`/orders/${order.id}`} className="btn-secondary btn-sm">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </PageContainer>
    );
}
// src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { BsPatchCheckFill } from 'react-icons/bs';

export default function OrderConfirmationPage() {
    const location = useLocation();
    const orderId = location.state?.orderId;

    // If a user navigates here directly without an orderId, redirect them
    if (!orderId) {
        return <Navigate to="/" replace />;
    }

    return (
        <PageContainer>
            <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-2xl shadow-lg shadow-accent/50">
                <div className="flex justify-center mb-4">
                    <BsPatchCheckFill size={60} className="text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-primary">Thank you for your order!</h1>
                <p className="text-text-medium mt-2">Your order has been placed successfully.</p>
                
                <div className="mt-6 text-sm text-text-dark bg-ivory p-4 rounded-lg">
                    <p>Your Order ID is:</p>
                    <p className="font-bold text-lg mt-1">#{orderId}</p>
                </div>

                <p className="text-text-medium mt-6 text-sm">
                    You will receive a confirmation email shortly with your order details and tracking information.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/shop" className="px-3 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition">
                        Continue Shopping
                    </Link>
                    <Link to="/orders" className="px-3 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition">
                        View My Orders
                    </Link>
                </div>
            </div>
        </PageContainer>
    );
}
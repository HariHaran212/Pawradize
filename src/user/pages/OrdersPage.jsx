import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import PageContainer from '../../components/PageContainer';

// Sample data for past orders
const sampleOrders = [
  {
    id: 'PAW-84321',
    date: '2025-09-15',
    status: 'Delivered',
    total: '₹1,798.00',
    items: [
      { id: 101, name: "Premium Dog Food 10kg", img: "/assets/Dog-food.jpg", price: 1499, quantity: 1 },
      { id: 104, name: "Interactive Feather Toy", img: "/assets/Feather-toy.jpeg", price: 299, quantity: 1 },
    ],
  },
  {
    id: 'PAW-84199',
    date: '2025-08-28',
    status: 'Delivered',
    total: '₹2,299.00',
    items: [
      { id: 103, name: "Comfy Pet Bed (Medium)", img: "/assets/Comfy-pet-bed.jpg", price: 2299, quantity: 1 },
    ],
  },
  {
    id: 'PAW-83550',
    date: '2025-07-02',
    status: 'Cancelled',
    total: '₹599.00',
    items: [
      { id: 102, name: "Eco-Friendly Cat Litter", img: "/assets/Cat-litter.jpg", price: 599, quantity: 1 },
    ],
  },
];

const statusStyles = {
    Delivered: 'bg-green-100 text-green-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderDetails = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <PageContainer>
			<h1 className="text-3xl font-bold text-primary mb-2">Your Orders</h1>
			<p className="text-text-medium mb-8">View your order history and track current shipments.</p>

			<div className="space-y-4">
				{sampleOrders.map((order) => (
					<div key={order.id} className="bg-white rounded-2xl shadow-lg shadow-accent/50 overflow-hidden">
						{/* Order Summary Header */}
						<div 
							className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 cursor-pointer"
							onClick={() => toggleOrderDetails(order.id)}
						>
							<div className="text-center sm:text-left mb-4 sm:mb-0">
								<p className="font-bold text-text-dark">Order ID: {order.id}</p>
								<p className="text-sm text-text-medium">Date: {order.date}</p>
							</div>
							<div className="flex items-center gap-4">
								<p className="font-bold text-lg text-primary">{order.total}</p>
								<span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[order.status]}`}>{order.status}</span>
								<FaChevronDown className={`transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} />
							</div>
						</div>

						{/* Collapsible Order Details */}
						<div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedOrderId === order.id ? 'max-h-[500px]' : 'max-h-0'}`}>
							<div className="bg-ivory p-6 border-t border-accent space-y-4">
								<h4 className="font-semibold text-text-dark">Items in this order:</h4>
								{order.items.map(item => (
									<div key={item.id} className="flex items-center gap-4">
											<img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/>
											<div className="flex-grow">
													<p className="font-medium text-text-dark">{item.name}</p>
													<p className="text-sm text-text-medium">Qty: {item.quantity} • ₹{item.price.toLocaleString()}</p>
											</div>
											<Link to={`/product/${item.id}`} className="px-3 py-1 text-sm bg-secondary text-slate-100 font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">
													Buy Again
											</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
    </PageContainer>
  );
}
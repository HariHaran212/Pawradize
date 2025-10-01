import React from 'react';
import { FaRupeeSign, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import AdminPageContainer from '../../admin/components/AdminPageContainer';

const StatCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
            <div className="bg-ivory text-primary p-3 rounded-full">{icon}</div>
            <div>
                <p className="text-sm text-text-medium">{title}</p>
                <p className="text-2xl font-bold text-text-dark">{value}</p>
            </div>
        </div>
    </div>
);

export default function StoreManagerDashboard() {
  return (
    <AdminPageContainer>
      <h1 className="text-3xl font-bold text-primary mb-6">Store Manager Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={<FaRupeeSign size={22}/>} title="Today's Revenue" value="₹12,500" />
        <StatCard icon={<FaShoppingCart size={22}/>} title="Pending Orders" value="15" />
        <StatCard icon={<FaBoxOpen size={22}/>} title="Low Stock Items" value="8" />
      </div>
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-text-dark">Recent Orders</h2>
        {/* You can list recent orders here */}
        <p className="mt-4 text-text-medium">A list of the 5 most recent orders would be displayed here.</p>
      </div>
    </AdminPageContainer>
  );
}
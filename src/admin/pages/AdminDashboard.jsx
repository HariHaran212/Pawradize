import React from 'react';
import { BsBoxSeam, BsGraphUp } from 'react-icons/bs';
import { FaRupeeSign, FaUsers, FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// --- Reusable Components defined within the file for simplicity ---

// Card for the key statistics at the top
const StatCard = ({ icon, title, value, change, changeType }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
        <div className="bg-ivory text-primary p-4 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-text-medium">{title}</p>
            <p className="text-2xl font-bold text-text-dark">{value}</p>
            <p className={`text-xs ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {change} this month
            </p>
        </div>
    </div>
);

// A generic container for charts or other modules
const DashboardModule = ({ title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
        <h3 className="text-lg font-semibold text-text-dark mb-4">{title}</h3>
        {children}
    </div>
);

// Sample data (in a real app, this would come from an API)
const recentActivities = [
    { text: "New order #PAW-84322 placed by Priya K.", time: "2m ago", icon: <BsBoxSeam/> },
    { text: "A new user, Rohan S., has registered.", time: "1h ago", icon: <FaUsers/> },
    { text: "Buddy (Dog) was marked as adopted.", time: "3h ago", icon: <FaPaw/> },
    { text: "Order #PAW-84199 has been shipped.", time: "1d ago", icon: <BsBoxSeam/> },
];

const topProducts = [
    { name: "Premium Dog Food 10kg", sales: 152 },
    { name: "Comfy Pet Bed (Medium)", sales: 98 },
    { name: "Interactive Feather Toy", sales: 205 },
];

export default function AdminDashboard() {
  return (
    <div className="font-poppins min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-text-medium">Welcome back, John! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<FaRupeeSign size={24}/>} title="Total Revenue" value="₹45,231" change="+12.5%" changeType="increase" />
            <StatCard icon={<BsBoxSeam size={24}/>} title="New Orders" value="172" change="+5.2%" changeType="increase" />
            <StatCard icon={<FaUsers size={24}/>} title="New Users" value="84" change="-1.8%" changeType="decrease" />
            <StatCard icon={<FaPaw size={24}/>} title="Pets Adopted" value="12" change="+20%" changeType="increase" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Sales Chart (Left) */}
            <div className="lg:col-span-2">
                <DashboardModule title="Sales Overview (Last 7 Days)">
                    {/* In a real app, you would replace this div with a chart component from a library like Recharts or Chart.js */}
                    <div className="h-72 flex items-end justify-between p-4 bg-ivory rounded-lg">
                        <div className="w-8 bg-primary rounded-t-md" style={{ height: '60%' }}></div>
                        <div className="w-8 bg-primary rounded-t-md" style={{ height: '40%' }}></div>
                        <div className="w-8 bg-primary rounded-t-md" style={{ height: '80%' }}></div>
                        <div className="w-8 bg-secondary rounded-t-md" style={{ height: '75%' }}></div>
                        <div className="w-8 bg-primary rounded-t-md" style={{ height: '50%' }}></div>
                        <div className="w-8 bg-primary rounded-t-md" style={{ height: '90%' }}></div>
                        <div className="w-8 bg-secondary rounded-t-md" style={{ height: '100%' }}></div>
                    </div>
                </DashboardModule>
            </div>
            
            {/* Recent Activity (Right) */}
            <div>
                <DashboardModule title="Recent Activity">
                    <ul className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="bg-ivory text-secondary p-2 rounded-full mt-1">{activity.icon}</div>
                                <div>
                                    <p className="text-sm text-text-dark">{activity.text}</p>
                                    <p className="text-xs text-text-medium">{activity.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </DashboardModule>
            </div>
        </div>
        
        {/* Secondary Info Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <DashboardModule title="Top Products This Month">
                <ul className="space-y-3">
                    {topProducts.map((product, index) => (
                        <li key={index} className="flex justify-between items-center text-sm">
                            <span className="text-text-dark">{product.name}</span>
                            <span className="font-bold text-primary">{product.sales} sales</span>
                        </li>
                    ))}
                </ul>
            </DashboardModule>
             <DashboardModule title="Quick Actions">
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/admin/orders" className="bg-secondary text-white font-semibold p-4 rounded-lg text-center hover:bg-accent transition-colors">Manage Orders</Link>
                    <Link to="/admin/products" className="bg-secondary text-white font-semibold p-4 rounded-lg text-center hover:bg-accent transition-colors">Manage Products</Link>
                    <Link to="/admin/users" className="bg-secondary text-white font-semibold p-4 rounded-lg text-center hover:bg-accent transition-colors">Manage Users</Link>
                    <Link to="/admin/adoptions" className="bg-secondary text-white font-semibold p-4 rounded-lg text-center hover:bg-accent transition-colors">Manage Adoptions</Link>
                </div>
            </DashboardModule>
        </div>
      </div>
    </div>
  );
}
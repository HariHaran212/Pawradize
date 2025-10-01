import React, { useState, useEffect } from 'react';
import { BsEye } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';

// Sample data for demonstration
const sampleOrders = [
  { id: 'PAW-84322', customerName: 'Priya K.', date: '2025-09-26', total: '₹1,798', status: 'Processing' },
  { id: 'PAW-84321', customerName: 'Rohan S.', date: '2025-09-25', total: '₹2,299', status: 'Shipped' },
  { id: 'PAW-84320', customerName: 'Anjali M.', date: '2025-09-25', total: '₹599', status: 'Delivered' },
  { id: 'PAW-84319', customerName: 'Vikram P.', date: '2025-09-24', total: '₹1,499', status: 'Delivered' },
  { id: 'PAW-84318', customerName: 'Sneha G.', date: '2025-09-22', total: '₹299', status: 'Cancelled' },
  // ...add more sample orders to test pagination
];

const statusStyles = {
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
};

const ITEMS_PER_PAGE = 10;

export default function AdminOrders() {
  const { basePath } = useRole();

  const [orders, setOrders] = useState(sampleOrders);
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let result = orders.filter(order => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, statusFilter, orders]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <AdminPageContainer>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">Manage Orders</h1>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text"
            placeholder="Search by name or order ID..."
            className="w-full sm:w-1/2 p-2 border border-accent rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="w-full sm:w-auto p-2 border border-accent rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ivory text-text-dark">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map(order => (
                <tr key={order.id} className="border-b border-accent hover:bg-ivory/50">
                  <td className="p-4 font-medium text-primary">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.total}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                        to={`${basePath}/orders/${order.id}`}
                    >
                        <button className="text-primary hover:text-secondary"><BsEye size={18} /></button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-text-medium">
                Showing {paginatedOrders.length} of {filteredOrders.length} orders
            </span>
            <div className="flex gap-2">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm bg-white border border-accent rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm bg-white border border-accent rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
      </div>
    </AdminPageContainer>
  );
}
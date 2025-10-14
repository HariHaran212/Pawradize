import React, { useState, useEffect } from 'react';
import { BsEye } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useDebounce } from '../../hooks/useDebounce'; // Import the hook
import apiClient from '../../api/apiClient'; // Your configured Axios instance

// Sample data for demonstration
const sampleOrders = [
  { id: 'PAW-84322', customerName: 'Priya K.', date: '2025-09-26', total: '₹1,798', status: 'Processing' },
  { id: 'PAW-84321', customerName: 'Rohan S.', date: '2025-09-25', total: '₹2,299', status: 'Shipped' },
  { id: 'PAW-84320', customerName: 'Anjali M.', date: '2025-09-25', total: '₹599', status: 'Delivered' },
  { id: 'PAW-84319', customerName: 'Vikram P.', date: '2025-09-24', total: '₹1,499', status: 'Delivered' },
  { id: 'PAW-84318', customerName: 'Sneha G.', date: '2025-09-22', total: '₹299', status: 'Cancelled' },
  // ...add more sample orders to test pagination
];

// const statusStyles = {
//     Processing: 'bg-yellow-100 text-yellow-800',
//     Shipped: 'bg-blue-100 text-blue-800',
//     Delivered: 'bg-green-100 text-green-800',
//     Cancelled: 'bg-red-100 text-red-800',
// };


const statusStyles = {
    PENDING: 'bg-gray-100 text-gray-800',
    PROCESSING: 'bg-yellow-100 text-yellow-800',
    SHIPPED: 'bg-blue-100 text-blue-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
};

const ITEMS_PER_PAGE = 10;

export default function AdminOrders() {
  const { basePath } = useRole();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term

// --- Data Fetching Effect ---
  useEffect(() => {
      const fetchOrders = async () => {
          setLoading(true);
          try {
              const params = new URLSearchParams();
              
              // Spring Pageable is 0-indexed, so we subtract 1
              params.append('page', currentPage - 1);
              params.append('size', 5);

              if (debouncedSearchTerm) {
                  params.append('search', debouncedSearchTerm);
              }
              if (statusFilter !== 'All') {
                  params.append('status', statusFilter);
              }

              const response = await apiClient.get('/api/admin/orders', { params })
              const data = response.data.data;

              setOrders(data.content || []);
              setTotalPages(data.totalPages);
              setTotalElements(data.totalElements);

          } catch (err) {
              setError('Failed to fetch orders.');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };

      fetchOrders();
  }, [debouncedSearchTerm, statusFilter, currentPage]); // Re-fetch when these change

  // Reset page to 1 when filters change
  useEffect(() => {
      setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  if (loading) return <AdminPageContainer><div>Loading orders...</div></AdminPageContainer>;
  if (error) return <AdminPageContainer><div>{error}</div></AdminPageContainer>;
  // if ( orders.length === 0) return <AdminPageContainer><div>No orders found.</div></AdminPageContainer>;

  // --- Filtered Orders based on search and status ---
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
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
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
              {orders.map(order => (
                <tr key={order.id} className="border-b border-accent hover:bg-ivory/50">
                  <td className="p-4 font-medium text-primary">{order.id}</td>
                  <td className="p-4">{order.customer?.customerName || 'N/A'}</td>
                  <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4">₹{order.totalAmount.toFixed(2)}</td>
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
          {!loading && orders.length === 0 && (
            <div className="text-center p-8">
                <p className="text-text-medium">No orders match the current filters.</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-text-medium">
              Showing {orders.length} of {totalElements} orders
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
                    disabled={currentPage === totalPages || totalPages === 0}
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
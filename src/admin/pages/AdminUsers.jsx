import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { useDebounce } from '../../hooks/useDebounce';
import PaginationControls from '../components/PaginationControls';

const allRoles = ['USER', 'STORE_MANAGER', 'ADOPTION_COORDINATOR', 'SUPER_ADMIN'];

// --- Modal Component for Editing Roles ---
const RoleEditModal = ({ user, isOpen, onClose, onSave }) => {
    const [selectedRole, setSelectedRole] = useState(user?.role || 'USER');

    useEffect(() => {
        if (user) {
            setSelectedRole(user.role);
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSave = () => {
        onSave(user.id, selectedRole);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-xl font-bold text-primary mb-4">Change Role for {user.name}</h2>
                <div>
                    <label htmlFor="role-select" className="block text-sm font-semibold mb-2">Select New Role</label>
                    <select 
                        id="role-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full border border-accent rounded-md p-3 bg-white"
                    >
                        {allRoles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                </div>
                <div className="flex gap-4 pt-6">
                    <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                    <button onClick={handleSave} className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters and Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch data from backend
  useEffect(() => {
      const fetchUsers = async () => {
          setLoading(true);
          try {
              const params = new URLSearchParams({ page: currentPage - 1, size: 10 });
              if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
              if (roleFilter !== 'All') params.append('role', roleFilter);
              
              const response = await apiClient.get('/api/admin/users', { params });
              setUsers(response.data.data.content);
              setTotalPages(response.data.data.totalPages);
          } catch (err) {
              setError(err.response?.data?.message || 'Failed to fetch users.');
          } finally {
              setLoading(false);
          }
      };
      fetchUsers();
  }, [debouncedSearchTerm, roleFilter, currentPage]);

  // Reset page when filters change
  useEffect(() => setCurrentPage(1), [debouncedSearchTerm, roleFilter]);

  
  const handleOpenModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleRoleSave = async (userId, newRole) => {
      try {
          const response = await apiClient.patch(`/api/admin/users/${userId}/role`, null, { params: { newRole } });
          // Update user in the local state
          setUsers(users.map(user => user.id === userId ? response.data.data : user));
          handleCloseModal();
      } catch (err) {
          alert(err?.response?.data?.message || 'Failed to update role.');
      }
  };

  const handleDeleteUser = async (userId) => {
      if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
          try {
              await apiClient.delete(`/api/admin/users/${userId}`);
              // Remove user from local state
              setUsers(users.filter(user => user.id !== userId));
          } catch (err) {
              alert('Failed to delete user.');
          }
      }
  };

  if (loading && users.length === 0) return <AdminPageContainer>Loading users...</AdminPageContainer>;
  if (error) return <AdminPageContainer>{error}</AdminPageContainer>;

  return (
    <>
      <RoleEditModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={editingUser}
        onSave={handleRoleSave}
      />
      <AdminPageContainer>
        <h1 className="text-3xl font-bold text-primary mb-6">Manage Users</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="w-full sm:w-1/2 p-2 border border-accent rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="w-full sm:w-auto p-2 border border-accent rounded-lg"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>All</option>
            {allRoles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ivory text-text-dark">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-accent hover:bg-ivory/50">
                  <td className="p-4 flex items-center gap-4">
                    <img src={user.avatarUrl  || `https://placehold.co/100?text=${user.name.charAt(0)}`} alt={user.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                    <span className="font-medium text-text-dark">{user.name}</span>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'SUPER_ADMIN' ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-700'}`}>{user.role}</span>
                  </td>
                  <td className="p-4">{user.joinedDate}</td>
                  <td className="p-4">
                    <div className="flex gap-4">
                      <button onClick={() => handleOpenModal(user)} className="text-blue-500 hover:text-blue-700" title="Edit Role"><BsPencilSquare size={16} /></button>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700" title="Delete User"><BsTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
        />
      </AdminPageContainer>
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';

const sampleUsers = [
  { id: 1, avatar: 'https://via.placeholder.com/100', name: 'Admin John', email: 'john.admin@pawradise.com', role: 'Super Admin', joinedDate: '2025-01-15' },
  { id: 2, avatar: 'https://via.placeholder.com/100', name: 'Manager Priya', email: 'priya.manager@pawradise.com', role: 'Store Manager', joinedDate: '2025-09-26' },
  { id: 3, avatar: 'https://via.placeholder.com/100', name: 'Coordinator Rohan', email: 'rohan.coordinator@pawradise.com', role: 'Adoption Coordinator', joinedDate: '2025-09-25' },
  { id: 4, avatar: 'https://via.placeholder.com/100', name: 'User Anjali', email: 'anjali.m@example.com', role: 'User', joinedDate: '2025-09-25' },
];

const allRoles = ['User', 'Store Manager', 'Adoption Coordinator', 'Super Admin'];

// --- Modal Component for Editing Roles ---
const RoleEditModal = ({ user, isOpen, onClose, onSave }) => {
    const [selectedRole, setSelectedRole] = useState(user?.role || 'User');

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
  const [users, setUsers] = useState(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    let result = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (roleFilter !== 'All') {
      result = result.filter(user => user.role === roleFilter);
    }
    setFilteredUsers(result);
  }, [searchTerm, roleFilter, users]);

  const handleOpenModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleRoleSave = (userId, newRole) => {
    // In a real app, you would make an API call here
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    alert(`User role updated to ${newRole}`);
    handleCloseModal();
  };

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
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-accent hover:bg-ivory/50">
                  <td className="p-4 flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="font-medium text-text-dark">{user.name}</span>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'Super Admin' ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-700'}`}>{user.role}</span>
                  </td>
                  <td className="p-4">{user.joinedDate}</td>
                  <td className="p-4">
                    <div className="flex gap-4">
                      <button onClick={() => handleOpenModal(user)} className="text-blue-500 hover:text-blue-700" title="Edit Role"><BsPencilSquare size={16} /></button>
                      <button className="text-red-500 hover:text-red-700" title="Delete User"><BsTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPageContainer>
    </>
  );
}
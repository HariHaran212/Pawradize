import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlusCircleFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { useUser } from '../../context/UserContext';
import { formatDateTime } from '../../utils/helper';

export default function AdminContentPage() {
  const { basePath } = useUser();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchGuides = async () => {
          try {
              const response = await apiClient.get(`/api/admin/content`);
              setGuides(response.data.data); // Assuming your ApiResponse wraps the list in a 'data' property
          } catch (err) {
              setError(err.response?.data?.message || 'Failed to fetch content guides. Please try again later.');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
      fetchGuides();
  }, []); // Empty array ensures this runs only once on component mount

  const handleDelete = async (guideId) => {
      if (window.confirm('Are you sure you want to permanently delete this guide?')) {
          try {
              await apiClient.delete(`/api/admin/content/${guideId}`);
              // Update the UI by removing the deleted guide from the state
              setGuides(currentGuides => currentGuides.filter(guide => guide.id !== guideId));
          } catch (err) {
              alert('Failed to delete the guide.');
              console.error(err);
          }
      }
  };

  const renderContent = () => {
      if (loading) {
          return <tr><td colSpan="4" className="p-4 text-center">Loading content...</td></tr>;
      }
      if (error) {
          return <tr><td colSpan="4" className="p-4 text-center text-red-500">{error}</td></tr>;
      }
      if (guides.length === 0) {
          return <tr><td colSpan="4" className="p-4 text-center">No guides have been created yet.</td></tr>;
      }
      return guides.map(guide => (
          <tr key={guide.id} className="border-b border-accent hover:bg-ivory/50">
              <td className="p-4 font-medium text-text-dark">
                <Link to={`${basePath}/guides/${guide.slug}`}>
									{guide.title}
								</Link>
							</td>
              <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      guide.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                  }`}>
                      {guide.status}
                  </span>
              </td>
              {/* Assuming your Content model has an 'updatedAt' or similar timestamp field */}
              <td className="p-4">{formatDateTime(guide.updatedAt)}</td>
              <td className="p-4">
                  <div className="flex gap-4">
                      <Link to={`${basePath}/guides/edit/${guide.slug}`} className="text-blue-500 hover:text-blue-700" title="Edit">
                          <BsPencilSquare size={16} />
                      </Link>
                      <button onClick={() => handleDelete(guide.id)} className="text-red-500 hover:text-red-700" title="Delete">
                          <BsTrash size={16} />
                      </button>
                  </div>
              </td>
          </tr>
      ));
  };
  
  return (
    <AdminPageContainer>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Manage Content</h1>
          <Link to={`${basePath}/guides/new`} className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
            <BsPlusCircleFill /> Add New Guide
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ivory text-text-dark">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {renderContent()}
            </tbody>
          </table>
        </div>
    </AdminPageContainer>
  );
}
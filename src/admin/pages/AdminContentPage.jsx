import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlusCircleFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';

// Sample data for your guides
const sampleGuides = [
    { id: 'new-puppy-guide', title: 'Your Guide to Bringing a New Puppy Home', status: 'Published', lastUpdated: '2025-09-28' },
    { id: 'new-kitten-guide', title: 'Your Guide to Welcoming a New Kitten Home', status: 'Published', lastUpdated: '2025-09-28' },
    { id: 'pet-anxiety-guide', title: 'Understanding and Easing Pet Anxiety', status: 'Draft', lastUpdated: '2025-09-29' },
];

export default function AdminContentPage() {
  return (
    <AdminPageContainer>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Manage Content</h1>
          <Link to="/admin/guides/new" className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
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
              {sampleGuides.map(guide => (
                <tr key={guide.id} className="border-b border-accent hover:bg-ivory/50">
                  <td className="p-4 font-medium text-text-dark">{guide.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${guide.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                        {guide.status}
                    </span>
                  </td>
                  <td className="p-4">{guide.lastUpdated}</td>
                  <td className="p-4">
                    <div className="flex gap-4">
                        <Link to={`/admin/guides/edit/${guide.id}`} className="text-blue-500 hover:text-blue-700" title="Edit"><BsPencilSquare size={16} /></Link>
                        <button className="text-red-500 hover:text-red-700" title="Delete"><BsTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </AdminPageContainer>
  );
}
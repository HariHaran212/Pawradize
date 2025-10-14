import React from 'react';
import { BsPlusCircleFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const samplePets = [
    { id: 11, img: "/assets/Dog-1.jpg", name: "Buddy", breed: "Golden Retriever Mix", status: "Available" },
    { id: 12, img: "/assets/Cat-1.jpg", name: "Nala", breed: "Domestic Shorthair", status: "Available" },
    { id: 13, img: "/assets/Rabbit-1.jpg", name: "Pip", breed: "Holland Lop", status: "Adopted" },
];

export default function AdminPets() {  const { basePath } = useRole();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pets from the backend when the component mounts
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await apiClient.get(`/api/pets`);
        setPets(response.data.data);
      } catch (err) {
        setError('Could not fetch pet data. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []); // The empty dependency array ensures this runs only once

  // Function to handle the deletion of a pet
  const handleDelete = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet listing? This action cannot be undone.')) {
      setLoading(true);
      
      try {
        await apiClient.delete(`/api/pets/${petId}`);
        // Remove the deleted pet from the state to update the UI instantly
        setPets(currentPets => currentPets.filter(pet => pet.id !== petId));
      } catch (err) {
        alert('Failed to delete the pet listing.');
        console.error('Delete error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <AdminPageContainer><p>Loading pets...</p></AdminPageContainer>;
  }

  if (error) {
    return <AdminPageContainer><p className="text-red-500">{error}</p></AdminPageContainer>;
  }

  return (
    <AdminPageContainer>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Manage Pet Listings</h1>
        <Link to={`${basePath}/pets/new`}>
          <button className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary">
            <BsPlusCircleFill /> Add New Pet
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-ivory text-text-dark">
            <tr>
              <th className="p-4">Pet</th>
              <th className="p-4">Breed</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id} className="border-b border-accent hover:bg-ivory/50">
                <td className="p-4 flex items-center gap-4">
                  <Link to={`${basePath}/pets/view/${pet.id}`} className="flex items-center gap-4">
                    <img src={pet.imageUrl} alt={pet.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                    <span className="font-medium text-text-dark">{pet.name}</span>
                  </Link>
                </td>
                <td className="p-4">{pet.breed}</td>
                <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${pet.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {pet.status}
                    </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <Link to={`${basePath}/pets/edit/${pet.id}`} className="text-blue-500 hover:text-blue-700">
                      <BsPencilSquare size={16} />
                    </Link>
                    <button onClick={() => handleDelete(pet.id)} className="text-red-500 hover:text-red-700">
                      <BsTrash size={16} />
                    </button>
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
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { useRole } from '../../context/RoleContext';
import axios from 'axios';

const API_URL = "http://localhost:2025";

const petTraits = ["Good with Children", "Good with Other Dogs", "Good with Cats", "Apartment Friendly", "House-Trained"];

export default function AddPet() {
  const { basePath } = useRole();
  const navigate = useNavigate();

  // State aligned with the backend Pet model
  const [petData, setPetData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    dateOfBirth: '',
    gender: 'Male',
    shortDescription: '',
    longDescription: '',
    price: 0,
    status: 'Available',
    personalityTraits: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setPetData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPetData(prev => {
      const traits = prev.personalityTraits;
      if (checked) {
        return { ...prev, personalityTraits: [...traits, value] };
      } else {
        return { ...prev, personalityTraits: traits.filter(trait => trait !== value) };
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Please upload a pet image.");
      return;
    }
    setLoading(true);
    setError('');

    // Use FormData to send both the pet data and the image file
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    // We send petData as a JSON string Blob, which the backend can easily parse
    formData.append('petData', new Blob([JSON.stringify(petData)], { type: "application/json" }));

    try {
      // Replace with your actual API endpoint
      const token = localStorage.getItem("authToken");
      
      await axios.post(`${API_URL}/api/pets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      alert("New pet listing created successfully!");
      navigate(`${basePath}/pets`);

    } catch (err) {
      console.error("Failed to add pet:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AdminPageContainer>
      <h1 className="text-2xl font-bold text-primary mb-6">Add New Pet Listing</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Pet Details */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Pet Name</label>
              <input type="text" name="name" value={petData.name} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Breed</label>
              <input type="text" name="breed" value={petData.breed} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Species</label>
              <select name="species" value={petData.species} onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2">
                <option>Dog</option>
                <option>Cat</option>
                <option>Rabbit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Gender</label>
              <select name="gender" value={petData.gender} onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={petData.dateOfBirth} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Adoption Fee (₹)</label>
              <input type="number" name="price" placeholder="e.g., 500" value={petData.price} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Short Description</label>
            <input type="text" name="shortDescription" placeholder="A short, catchy description for the card" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Full Description</label>
            <textarea name="longDescription" rows="6" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Personality & Traits</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {petTraits.map(trait => <label key={trait} className="flex items-center gap-2 text-sm"><input type="checkbox" value={trait} onChange={handleCheckboxChange} className="rounded"/>{trait}</label>)}
            </div>
          </div>
        </div>
        {/* Right Column: Image & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-text-dark mb-4">Pet Image</h3>
            <div className="w-full h-48 bg-ivory rounded-lg border-2 border-dashed border-accent flex items-center justify-center">{imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" loading="lazy" /> : <BsUpload size={32} className="text-text-medium"/>}</div>
            
            <label className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg shadow hover:bg-secondary transition cursor-pointer">
            Upload New Picture
              <input 
                  type="file" 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden"
              />
            </label>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
             <h3 className="text-lg font-semibold text-text-dark mb-4">Status & Actions</h3>
             
             <label className="block text-sm font-semibold mb-2">Status</label>
             <select name="status" onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2 mb-4">
              <option>Available</option>
              <option>Pending</option>
              <option>Adopted</option>
            </select>

             <div className="flex flex-col gap-3">
                <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary">
                  {loading ? 'Saving...' : 'Save Pet'}
                </button>
                <Link to={`${basePath}/pets`} className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 text-center">Cancel</Link>
             </div>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </div>
        </div>
      </form>
    </AdminPageContainer>
  );
}
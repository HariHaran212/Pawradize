import React, { useState, useEffect } from 'react';
import AdoptionCoordinatorLayout from '../../layouts/AdoptionCoordinatorLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import axios from 'axios';
import { useRole } from '../../context/RoleContext';
import apiClient from '../../api/apiClient';

const API_URL = "http://localhost:2025";

const samplePets = [ 
    { id: 11, name: "Buddy", type: "Dog", breed: "Golden Retriever Mix", age: "2 yrs", gender: "Male", shortDescription: 'Playful, vaccinated.', longDescription: 'Buddy loves walks and is great with kids.', status: "Available", goodWith: ["Good with Children", "Good with Other Dogs"], img: "/assets/Dog-1.jpg" },
    { id: 12, name: "Nala", type: "Cat", breed: "Domestic Shorthair", age: "1.5 yrs", gender: "Female", shortDescription: 'Calm and cuddly.', longDescription: 'Nala is a sweet and gentle soul who loves a warm lap.', status: "Available", goodWith: ["Quiet Homes"], img: "/assets/Cat-1.jpg" },
    { id: 13, name: "Pip", type: "Rabbit", breed: "Holland Lop", age: "6 mo", gender: "Male", shortDescription: 'Gentle companion.', longDescription: 'Pip is a curious and gentle rabbit with a calm temperament.', status: "Adopted", goodWith: ["Experienced Owners"], img: "/assets/Rabbit-1.jpg" },
];
const initialPetState = {
    name: '',
    species: 'Dog',
    breed: '',
    gender: 'Male',
    dateOfBirth: '',
    shortDescription: '',
    longDescription: '',
    status: 'Available',
    personalityTraits: [],
    price: 0,
};

const petTraits = ["Good with Children", "Good with Other Dogs", "Good with Cats", "Apartment Friendly", "House-Trained"];

export default function EditPet() {
  const { id } = useParams();
  const { basePath } = useRole();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(initialPetState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await apiClient.get(`/api/pets/${id}`);
        
        const fetchedPet = response.data.data;

        setPetData({
            ...initialPetState, // Ensures all fields are present
            ...fetchedPet,
            dateOfBirth: fetchedPet.dateOfBirth || '',
        });
        setImagePreview(fetchedPet.imageUrl);
      } catch (err) {
        setError('Failed to load pet data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const handleInputChange = (e) => {
      setPetData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      const traits = petData.personalityTraits || [];
      if (checked) {
          setPetData(prev => ({ ...prev, personalityTraits: [...traits, value] }));
      } else {
          setPetData(prev => ({ ...prev, personalityTraits: traits.filter(trait => trait !== value) }));
      }
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
      setLoading(true);

      const formData = new FormData();
      // The DTO for update doesn't need the id, age, or imageUrl in the JSON body
      const { id: petId, age, imageUrl, ...dtoData } = petData;
      formData.append('petData', new Blob([JSON.stringify(dtoData)], { type: "application/json" }));

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      try {
          await apiClient.put(`/api/pets/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          alert("Pet details updated successfully!");
          navigate(`${basePath}/pets`);
      } catch (err) {
          setError('Failed to update pet.');
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  if (loading && !petData) return <AdminPageContainer><p>Loading pet data...</p></AdminPageContainer>;
  if (error) return <AdminPageContainer><p className="text-red-500">{error}</p></AdminPageContainer>;
  if (!petData) return <AdminPageContainer><p>Pet not found.</p></AdminPageContainer>;


  return (
    <AdminPageContainer>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Pet Listing: {petData.name}</h1>
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
              <input type="date" name="dateOfBirth" value={petData.dateOfBirth} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Adoption Fee (₹)</label>
              <input type="number" name="price" placeholder="e.g., 500" value={petData.price} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Short Description</label>
            <input type="text" name="shortDescription" value={petData.shortDescription} placeholder="A short, catchy description for the card" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Full Description</label>
            <textarea name="longDescription" value={petData.longDescription} rows="6" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Personality & Traits</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {petTraits.map(trait => (
                    <label key={trait} className="flex items-center gap-2 text-sm">
                        <input 
                            type="checkbox" 
                            value={trait} 
                            checked={petData.personalityTraits.includes(trait)} // This pre-fills the checkboxes
                            onChange={handleCheckboxChange} 
                            className="rounded"
                        />
                        {trait}
                    </label>
                ))}
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
             <select name="status" value={petData.status} onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2 mb-4"><option>Available</option><option>Pending</option><option>Adopted</option></select>
             <div className="flex flex-col gap-3">
                <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary">Update Pet</button>
                <Link to="/adoption/pets" className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 text-center">Cancel</Link>
             </div>
          </div>
        </div>
      </form>
    </AdminPageContainer>
  );
}
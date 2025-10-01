import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { useRole } from '../../context/RoleContext';

const petTraits = ["Good with Children", "Good with Other Dogs", "Good with Cats", "Apartment Friendly", "House-Trained"];

export default function AddPet() {
  const { basePath } = useRole();

  const [petData, setPetData] = useState({ name: '', type: 'Dog', breed: '', age: '', gender: 'Male', shortDescription: '', longDescription: '', status: 'Available', goodWith: [] });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPetData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPetData(prev => {
      if (checked) {
        return { ...prev, goodWith: [...prev.goodWith, value] };
      } else {
        return { ...prev, goodWith: prev.goodWith.filter(trait => trait !== value) };
      }
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new pet:", { ...petData, image: imagePreview });
    alert("New pet listing created successfully!");
    navigate(`${basePath}/pets`);
  };

  return (
    <AdminPageContainer>
      <h1 className="text-2xl font-bold text-primary mb-6">Add New Pet Listing</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Pet Details */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-semibold mb-2">Pet Name</label><input type="text" name="name" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/></div>
            <div><label className="block text-sm font-semibold mb-2">Breed</label><input type="text" name="breed" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/></div>
            <div><label className="block text-sm font-semibold mb-2">Type</label><select name="type" onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2"><option>Dog</option><option>Cat</option><option>Rabbit</option></select></div>
            <div><label className="block text-sm font-semibold mb-2">Gender</label><select name="gender" onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2"><option>Male</option><option>Female</option></select></div>
            <div><label className="block text-sm font-semibold mb-2">Age</label><input type="text" name="age" placeholder="e.g., 2 yrs" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"/></div>
          </div>
          <div><label className="block text-sm font-semibold mb-2">Short Description</label><input type="text" name="shortDescription" placeholder="A short, catchy description for the card" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" /></div>
          <div><label className="block text-sm font-semibold mb-2">Full Description</label><textarea name="longDescription" rows="6" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"></textarea></div>
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
            <div className="w-full h-48 bg-ivory rounded-lg border-2 border-dashed border-accent flex items-center justify-center">{imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" /> : <BsUpload size={32} className="text-text-medium"/>}</div>
            <input type="file" onChange={handleFileChange} className="mt-4 w-full text-sm" accept="image/*" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
             <h3 className="text-lg font-semibold text-text-dark mb-4">Status & Actions</h3>
             <label className="block text-sm font-semibold mb-2">Status</label>
             <select name="status" onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2 mb-4"><option>Available</option><option>Pending</option><option>Adopted</option></select>
             <div className="flex flex-col gap-3">
                <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary">Save Pet</button>
                <Link to={`${basePath}/pets`} className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 text-center">Cancel</Link>
             </div>
          </div>
        </div>
      </form>
    </AdminPageContainer>
  );
}
import React, { useState, useEffect } from 'react';
import AdoptionCoordinatorLayout from '../../layouts/AdoptionCoordinatorLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';

const samplePets = [ 
    { id: 11, name: "Buddy", type: "Dog", breed: "Golden Retriever Mix", age: "2 yrs", gender: "Male", shortDescription: 'Playful, vaccinated.', longDescription: 'Buddy loves walks and is great with kids.', status: "Available", goodWith: ["Good with Children", "Good with Other Dogs"], img: "/assets/Dog-1.jpg" },
    { id: 12, name: "Nala", type: "Cat", breed: "Domestic Shorthair", age: "1.5 yrs", gender: "Female", shortDescription: 'Calm and cuddly.', longDescription: 'Nala is a sweet and gentle soul who loves a warm lap.', status: "Available", goodWith: ["Quiet Homes"], img: "/assets/Cat-1.jpg" },
    { id: 13, name: "Pip", type: "Rabbit", breed: "Holland Lop", age: "6 mo", gender: "Male", shortDescription: 'Gentle companion.', longDescription: 'Pip is a curious and gentle rabbit with a calm temperament.', status: "Adopted", goodWith: ["Experienced Owners"], img: "/assets/Rabbit-1.jpg" },
];

const petTraits = ["Good with Children", "Good with Other Dogs", "Good with Cats", "Apartment Friendly", "House-Trained"];

export default function EditPet() {
  const { id } = useParams(); // Get pet ID from URL
  const navigate = useNavigate();
  
  const [petData, setPetData] = useState(null); // Start with null to handle loading state
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const petToEdit = samplePets.find(p => p.id === parseInt(id));
    if (petToEdit) {
        setPetData(petToEdit);
        setImagePreview(petToEdit.img);
    }
  }, [id]);

  const handleInputChange = (e) => {
    setPetData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPetData(prev => {
      const goodWith = prev.goodWith || []; // Ensure goodWith is an array
      if (checked) {
        return { ...prev, goodWith: [...goodWith, value] };
      } else {
        return { ...prev, goodWith: goodWith.filter(trait => trait !== value) };
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
    console.log("Updating pet:", petData);
    alert("Pet details updated successfully!");
    navigate('/adoption/pets');
  };
  
  if (!petData) {
    return (
        <AdoptionCoordinatorLayout>
            <p className="text-center">Loading pet data...</p>
        </AdoptionCoordinatorLayout>
    );
  }

  return (
    <AdminPageContainer>
      <h1 className="text-2xl font-bold text-primary mb-6">Edit Pet Listing: {petData.name}</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Pet Details */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-semibold mb-2">Pet Name</label><input type="text" name="name" value={petData.name} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/></div>
            <div><label className="block text-sm font-semibold mb-2">Breed</label><input type="text" name="breed" value={petData.breed} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/></div>
            <div><label className="block text-sm font-semibold mb-2">Type</label><select name="type" value={petData.type} onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2"><option>Dog</option><option>Cat</option><option>Rabbit</option></select></div>
            <div><label className="block text-sm font-semibold mb-2">Gender</label><select name="gender" value={petData.gender} onChange={handleInputChange} className="w-full bg-white border border-accent rounded-md p-2"><option>Male</option><option>Female</option></select></div>
            <div><label className="block text-sm font-semibold mb-2">Age</label><input type="text" name="age" value={petData.age} placeholder="e.g., 2 yrs" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"/></div>
          </div>
          <div><label className="block text-sm font-semibold mb-2">Short Description</label><input type="text" name="shortDescription" value={petData.shortDescription} placeholder="A short, catchy description for the card" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" /></div>
          <div><label className="block text-sm font-semibold mb-2">Full Description</label><textarea name="longDescription" value={petData.longDescription} rows="6" onChange={handleInputChange} className="w-full border border-accent rounded-md p-2"></textarea></div>
          <div>
            <label className="block text-sm font-semibold mb-2">Personality & Traits</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {petTraits.map(trait => (
                    <label key={trait} className="flex items-center gap-2 text-sm">
                        <input 
                            type="checkbox" 
                            value={trait} 
                            checked={petData.goodWith.includes(trait)} // This pre-fills the checkboxes
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
            <input type="file" onChange={handleFileChange} className="mt-4 w-full text-sm" accept="image/*" />
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
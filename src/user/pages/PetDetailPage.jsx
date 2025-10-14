// src/pages/PetDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';

// You would normally fetch data, but for this example, we'll re-use it.
// It's best practice to move this to a shared data file.
import Dog from "/assets/Dog-1.jpg";
import Cat from "/assets/Cat-1.jpg";
import Rabbit from "/assets/Rabbit-1.jpg";

const pets = [
    { id: 11, name: "Buddy", type: "Dog", breed: "Golden Retriever Mix", gender: "Male", img: Dog, age: "2 yrs", short: "Playful, vaccinated.", description: "Buddy is an energetic and loving companion who adores fetch and long walks. He is fully vaccinated, house-trained, and gets along well with children and other dogs. He's looking for an active family to call his own.", goodWith: ["Children", "Other Dogs", "Active Families"] },
    { id: 12, name: "Nala", type: "Cat", breed: "Domestic Shorthair", gender: "Female", img: Cat, age: "1.5 yrs", short: "Calm and cuddly.", description: "Nala is a sweet and gentle soul who loves nothing more than a warm lap and a good nap. She is litter-trained, spayed, and prefers a quiet home where she can be the center of attention. She is initially shy but warms up quickly.", goodWith: ["Quiet Homes", "Singles/Couples"] },
    { id:13, name: "Pip", type: "Rabbit", breed: "Holland Lop", gender: "Male", img: Rabbit, age: "6 mo", short: "Gentle companion.", description: "Pip is a curious and gentle rabbit with a calm temperament. He enjoys being petted and is comfortable being handled. He is litter-trained and would thrive in a home that understands the specific needs of rabbits.", goodWith: ["Experienced Owners", "Quiet Environments"] },
];

export default function PetDetailPage() {
  const { id } = useParams(); // Gets the pet's ID from the URL
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetById = async () => {
      try {
        setLoading(true);
        // Make the API call to your backend
        const response = await apiClient.get(`/api/pets/${id}`);
        // Your backend wraps the data in a 'data' object
        setPet(response.data.data); 
      } catch (err) {
        console.error("Failed to fetch pet:", err);
        setError("Could not load pet details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetById();
  }, [id]);

// 3. Handle loading state
  if (loading) {
    return (
      <div className="text-center py-20 font-poppins">
        <h2 className="text-2xl font-bold text-primary">Loading...</h2>
      </div>
    );
  }
  
  // 4. Handle error or not-found state
  if (error || !pet) {
    return (
      <div className="text-center py-20 font-poppins">
        <h2 className="text-2xl font-bold text-primary">{error || 'Pet not found!'}</h2>
        <Link to="/find-a-friend" className="text-secondary hover:underline mt-4 inline-block">← Back to all pets</Link>
      </div>
    );
  }

  return (
    <div className="font-poppins min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/find-a-friend" className="text-primary hover:underline mb-6 inline-block">← Back to all pets</Link>
        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-3xl shadow-lg shadow-accent/50">
          
          {/* Left Column: Pet Image */}
          <div>
            <img src={pet.imageUrl} alt={pet.name} className="w-full h-auto object-cover rounded-2xl" loading="lazy" />
          </div>

          {/* Right Column: Pet Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-text-dark">{pet.name}</h1>
            <p className="text-text-medium mt-1">{pet.breed}</p>

            <div className="flex flex-wrap gap-2 my-4">
              <span className="text-xs font-semibold px-3 py-1 bg-ivory text-primary rounded-full">{pet.age}</span>
              <span className="text-xs font-semibold px-3 py-1 bg-ivory text-primary rounded-full">{pet.gender}</span>
              <span className="text-xs font-semibold px-3 py-1 bg-ivory text-primary rounded-full">{pet.species}</span>
            </div>

            <h2 className="text-xl font-bold text-primary mt-4">About {pet.name}</h2>
            <p className="text-text-medium leading-relaxed mt-2 flex-grow">{pet.longDescription}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-text-dark">Good with:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {pet.personalityTraits .map(item => <span key={item} className="text-sm px-3 py-1 bg-highlight text-text-dark rounded-full">{item}</span>)}
              </div>
            </div>
            
            <div className="mt-8 flex items-center space-x-4">
                <Link to={`/pet/welcome-home/${pet.id}`} className='w-full'>
                  <button className="w-full flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">
                      Apply to Welcome Home
                  </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
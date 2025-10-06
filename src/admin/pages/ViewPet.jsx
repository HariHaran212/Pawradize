import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { useRole } from '../../context/RoleContext';

// Helper function to determine the style for the status badge
const getStatusStyles = (status) => {
    switch (status) {
        case 'Available':
            return 'bg-green-100 text-green-800';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Adopted':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function ViewPet() {
    const { id } = useParams();
    const { basePath } = useRole();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await apiClient.get(`/api/pets/${id}`);
                setPet(response.data.data);
            } catch (err) {
                setError('Could not fetch pet details. The pet may not exist.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPet();
    }, [id]);

    if (loading) {
        return <AdminPageContainer><p className="text-center">Loading pet details...</p></AdminPageContainer>;
    }

    if (error || !pet) {
        return (
            <AdminPageContainer>
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold text-red-500">{error}</h2>
                    <Link to={`${basePath}/pets`} className="text-primary hover:underline mt-4 inline-block">← Back to Pet Listings</Link>
                </div>
            </AdminPageContainer>
        );
    }

    return (
        <AdminPageContainer>
            
            <div className="pt-4">
                <Link to={`${basePath}/pets`} className="text-secondary hover:underline">← Back to Pet Listings</Link>
            </div>

            <div className="flex justify-between items-center my-6">
                <h1 className="text-2xl font-bold text-primary">Pet Details</h1>
                <Link to={`/admin/pets/edit/${pet.id}`} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                    Edit Pet
                </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Image Column */}
                    <div className="md:col-span-1">
                        <img src={pet.imageUrl} alt={pet.name} className="w-full h-auto object-cover rounded-lg shadow-lg" loading="lazy" />
                    </div>

                    {/* Details Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-3xl font-bold text-text-dark">{pet.name}</h2>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyles(pet.status)}`}>
                                {pet.status}
                            </span>
                        </div>

                        <p className="text-text-medium text-lg italic">"{pet.shortDescription}"</p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-b border-accent py-6">
                            <div>
                                <p className="text-sm text-text-medium">Species</p>
                                <p className="font-semibold text-lg">{pet.species}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">Breed</p>
                                <p className="font-semibold text-lg">{pet.breed}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">Age</p>
                                <p className="font-semibold text-lg">{pet.age}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">Gender</p>
                                <p className="font-semibold text-lg">{pet.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">Adoption Fee</p>
                                <p className="font-semibold text-lg text-primary">₹{pet.price.toLocaleString()}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-md font-semibold text-text-dark mb-2">Personality & Traits</h3>
                            <div className="flex flex-wrap gap-2">
                                {pet.personalityTraits.map(trait => (
                                    <span key={trait} className="bg-ivory text-text-dark text-sm font-medium px-3 py-1 rounded-full">
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-md font-semibold text-text-dark mb-2">About {pet.name}</h3>
                            <p className="text-text-medium whitespace-pre-wrap">{pet.longDescription}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </AdminPageContainer>
    );
}
import React, { useState, useEffect } from "react";
import PetCard from "../../components/PetCard";
import PageContainer from "../../components/PageContainer";
import apiClient from '../../api/apiClient'; // Your centralized axios client

export default function FindFriend() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await apiClient.get('/api/pets');
                setPets(response.data.data); // Assuming ApiResponse wrapper
            } catch (err) {
                setError(err.response?.data?.message || 'Could not load pets at this time. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);

    const renderPetGrid = () => {
        if (loading) {
            return <p className="text-center">Finding new friends...</p>;
        }
        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }
        if (pets.length === 0) {
            return <p className="text-center">No pets are currently available for adoption. Please check back soon!</p>;
        }
        return (
            <div className="grid md:grid-cols-3 gap-6">
                {/* The pet object from the API now has all the data the PetCard needs.
                    Ensure PetCard uses pet.imageUrl and pet.shortDescription */}
                {pets.map(p => <PetCard key={p.id} pet={p} />)}
            </div>
        );
    };

    return (
        <PageContainer>
            <h1 className="text-3xl text-primary font-bold mb-4">Find a Friend</h1>
            <p className="text-gray-600 mb-8">Browse local pets that are ready for a loving home. Each pet has details, health records, and an easy application form.</p>
            
            {renderPetGrid()}
            
            {/* The static 3-step process section remains unchanged */}
            <section className="mt-16 p-8 rounded-2xl bg-ivory text-text-dark">
                <h3 className="text-2xl font-bold text-black text-center mb-8">
                    Our Simple 3-Step Adoption Process
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-ivory font-bold text-xl rounded-full mb-3">1</div>
                        <h4 className="font-semibold mb-1">Submit Application</h4>
                        <p className="text-sm text-text-medium">Fill out our online form with your details and tell us about the loving home you can provide.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-ivory font-bold text-xl rounded-full mb-3">2</div>
                        <h4 className="font-semibold mb-1">Meet & Greet</h4>
                        <p className="text-sm text-text-medium">We'll schedule a friendly virtual home-check and a meet-up for you to connect with your chosen pet.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary text-ivory font-bold text-xl rounded-full mb-3">3</div>
                        <h4 className="font-semibold mb-1">Welcome Home</h4>
                        <p className="text-sm text-text-medium">Finalize the adoption and welcome your new friend! We offer follow-up support to ensure a smooth transition.</p>
                    </div>
                </div>
            </section>
        </PageContainer>
    );
}
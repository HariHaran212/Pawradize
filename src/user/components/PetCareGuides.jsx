import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient'; // Your centralized axios instance

export default function PetCareGuides() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const response = await apiClient.get('/api/content');
                const publishedGuides = response.data.data.filter(guide => guide.status === 'Published');
                setGuides(publishedGuides);
            } catch (err) {
                setError('Could not load our guides at this time. Please check back later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    if (loading) {
        // In a real app, you could replace this with skeleton loader cards for better UX
        return <p className="text-center text-text-medium">Loading guides...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (guides.length === 0) {
        return <p className="text-center text-text-medium">No pet care guides are available at the moment.</p>;
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map(guide => (
                <Link 
                    key={guide.slug} 
                    to={`/guides/${guide.slug}`} 
                    className="block bg-white rounded-2xl shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
                >
                    <div className="h-48 overflow-hidden">
                        <img src={guide.heroImageUrl} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-6">
                        <p className="text-secondary font-semibold text-sm">{guide.subtitle}</p>
                        <h3 className="text-xl font-bold text-text-dark mt-1 group-hover:text-primary transition-colors">{guide.title}</h3>
                        <p className="text-text-medium text-sm mt-2">{guide.snippet}</p>
                        <span className="inline-block mt-4 font-semibold text-primary group-hover:underline">Read More →</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
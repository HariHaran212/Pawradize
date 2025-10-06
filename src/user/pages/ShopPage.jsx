import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import apiClient from '../../api/apiClient'; // Your centralized axios client

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/api/products');
                setProducts(response.data.data); // Assuming ApiResponse wrapper
            } catch (err) {
                setError('Could not load products at this time. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (e, productName) => {
        e.preventDefault(); 
        alert(`${productName} added to cart!`);
    };

    const renderProductGrid = () => {
        if (loading) {
            return <p className="text-center">Loading products...</p>;
        }
        if (error) {
            return <p className="text-center text-red-500">{error}</p>;
        }
        if (products.length === 0) {
            return <p className="text-center">No products found.</p>;
        }
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-2xl shadow-lg shadow-grey/50 overflow-hidden flex flex-col group">
                        <div className="overflow-hidden">
                            {/* Change: Use p.imageUrl from backend */}
                            <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                             {/* Change: Use p.name from backend */}
                            <h3 className="font-semibold text-text-dark flex-grow">{p.name}</h3>
                            <div className="mt-2 flex items-center justify-between">
                                 {/* Change: Format price from backend number */}
                                <span className="font-bold text-lg">₹{p.price.toLocaleString()}</span>
                                {/* Note: 'badge' is not in the backend model and has been removed. */}
                            </div>
                            <button 
                                onClick={(e) => handleAddToCart(e, p.name)}
                                className="mt-4 w-full bg-primary text-white rounded-lg py-2 font-semibold hover:bg-secondary transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold text-primary mb-4">Shop Essentials</h1>
            <p className="text-text-medium mb-8">Quality food, toys and supplies - curated for every stage of your pet's life.</p>
            {renderProductGrid()}
        </PageContainer>
    );
}
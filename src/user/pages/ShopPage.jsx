import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import apiClient from '../../api/apiClient'; // Your centralized axios client
import { useCart } from '../../context/CartContext';
import { useDebounce } from '../../hooks/useDebounce'; // Assuming you have this hook
import ProductCard from '../../components/ProductCard';

// Hardcoded filter options - in a real app, these could be fetched from an API
const filterOptions = {
    species: ['Dog', 'Cat', 'Rabbit', 'Bird'],
    categories: ['Food', 'Toys', 'Grooming', 'Health'],
    brands: ['Royal Canin', 'Pedigree', 'Whiskas', 'Trixie'],
};

// --- Reusable Checkbox Group Component ---
const FilterGroup = ({ title, options, selected, onChange }) => (
    <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <div className="space-y-2">
            {options.map(option => (
                <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        value={option}
                        checked={selected.includes(option)}
                        onChange={onChange}
                        className="rounded text-primary focus:ring-primary"
                    />
                    {option}
                </label>
            ))}
        </div>
    </div>
);

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    // --- State for Filters, Search, and Pagination ---
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ species: [], categories: [], brands: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({ page: currentPage - 1, size: 12 });
                if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
                filters.species.forEach(s => params.append('species', s));
                filters.categories.forEach(c => params.append('category', c));
                filters.brands.forEach(b => params.append('brand', b));
                
                const response = await apiClient.get('/api/products', { params });
                setProducts(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                setError(err.response?.data?.message || 'Could not load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [debouncedSearchTerm, filters, currentPage]);

    const handleFilterChange = (e, filterType) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            const currentSelection = prev[filterType];
            const newSelection = checked
                ? [...currentSelection, value]
                : currentSelection.filter(item => item !== value);
            return { ...prev, [filterType]: newSelection };
        });
        setCurrentPage(1); // Reset to page 1 on filter change
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        addToCart(product);
        alert(`${product.name} added to cart!`);
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        );
    };

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold text-primary mb-4">Shop Essentials</h1>
            <p className="text-text-medium mb-8">Quality food, toys and supplies - curated for every stage of your pet's life.</p>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* --- Filter Sidebar --- */}
                <aside className="w-full lg:w-1/4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-accent rounded-lg"
                        />
                        <FilterGroup title="Pet Type" options={filterOptions.species} selected={filters.species} onChange={(e) => handleFilterChange(e, 'species')} />
                        <hr/>
                        <FilterGroup title="Category" options={filterOptions.categories} selected={filters.categories} onChange={(e) => handleFilterChange(e, 'categories')} />
                        <hr/>
                        <FilterGroup title="Brand" options={filterOptions.brands} selected={filters.brands} onChange={(e) => handleFilterChange(e, 'brands')} />
                    </div>
                </aside>

                {/* --- Product Grid --- */}
                <main className="w-full lg:w-3/4">
                    {renderProductGrid()}
                </main>
            </div>
        </PageContainer>
    );
}
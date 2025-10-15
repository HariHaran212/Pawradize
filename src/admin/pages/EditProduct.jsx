import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { useUser } from '../../context/UserContext';

export default function EditProduct() {
  const { id } = useParams(); // Get product ID from URL
  const { basePath } = useUser();
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: '',
    brand: '',
    featuredSpecies: [],
  });
  const [sku, setSku] = useState('');

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- CHANGE: Fetch product data from the backend ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/api/admin/products/${id}`);
        const product = response.data.data;

        // Populate form with fetched data
        setProductData({
            name: product.name,
            description: product.description,
            price: product.price,
            stockQuantity: product.stockQuantity,
            category: product.category,
            brand: product.brand,
            featuredSpecies: product.featuredSpecies || [],
        });

        setSku(product.sku); // SKU is not editable
        setImagePreview(product.imageUrl); // Set initial image preview from URL
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product data.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    setProductData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the actual file object
      setImagePreview(URL.createObjectURL(file)); // Update the preview
    }
  };

  
  const handleSpeciesChange = (e) => {
    const { value, checked } = e.target;
    setProductData(prev => {
        // Get the current list of species
        const currentSpecies = prev.featuredSpecies;
        if (checked) {
            // If checked, add the new species to the list
            return { ...prev, featuredSpecies: [...currentSpecies, value] };
        } else {
            // If unchecked, remove the species from the list
            return { ...prev, featuredSpecies: currentSpecies.filter(s => s !== value) };
        }
    });
  };
  
  // --- CHANGE: Implement submission to the backend ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();

    formData.append('productData', new Blob([JSON.stringify(productData)], { type: "application/json" }));

    // Only append the image file if a new one was selected
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      await apiClient.put(`/api/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Product updated successfully!");
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product.");
    } finally {
      setLoading(false);
    }
  };
  
  const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];

  return (
    <AdminPageContainer>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">Edit Product</h1>
        {/* The form structure is identical to AddProduct, but pre-filled with data */}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">SKU (Product ID)</label>
              <input type="text" name="sku" value={sku} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" disabled/>
            </div>
             <div>
              <label className="block text-sm font-semibold mb-2">Product Name</label>
              <input type="text" name="name" value={productData.name} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea name="description" value={productData.description} onChange={handleInputChange} rows="6" className="w-full border border-accent rounded-md p-2"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Brand</label>
              <input type="text" name="brand" value={productData.brand} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹)</label>
                <input type="number" name="price" value={productData.price} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
              </div>
               <div>
                <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
                <input type="number" name="stockQuantity" value={productData.stockQuantity} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
              </div>
            </div>
             <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select name="category" value={productData.category} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2 bg-white">
                    <option>Food</option>
                    <option>Toys</option>
                    <option>Supplies</option>
                    <option>Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">For Pet Type(s)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {speciesOptions.map(species => (
                        <label key={species} className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                value={species}
                                checked={productData.featuredSpecies.includes(species)}
                                onChange={handleSpeciesChange}
                                className="rounded text-primary focus:ring-primary"
                            />
                            {species}
                        </label>
                    ))}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Product Image</h3>
                <div className="w-full h-48 bg-ivory rounded-lg border-2 border-dashed border-accent flex items-center justify-center text-center">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" loading="lazy" /> : <div><BsUpload size={32} className="mx-auto mb-2"/><p>Upload Image</p></div>}
                </div>
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
                 <h3 className="text-lg font-semibold text-text-dark mb-4">Actions</h3>
                 <div className="flex flex-col gap-3">
                    <button 
                      type="submit" 
                      className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Update Product"}
                    </button>
                    <Link to={`${basePath}/products`} className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition-colors text-center">Cancel</Link>
                 </div>
              </div>
          </div>
        </form>
      </div>
    </AdminPageContainer>
  );
}
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { useRole } from '../../context/RoleContext';

export default function AddProduct() {
  const { basePath } = useRole();

  const [productData, setProductData] = useState({ name: '', description: '', price: '', stock: '', category: 'Food' });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend API
    console.log("Submitting new product:", { ...productData, image: imagePreview });
    alert("Product added successfully!");
    navigate(`${basePath}/products`);
  };

  return (
    <AdminPageContainer>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Product Details */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name</label>
              <input type="text" name="name" value={productData.name} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea name="description" value={productData.description} onChange={handleInputChange} rows="6" className="w-full border border-accent rounded-md p-2"></textarea>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹)</label>
                <input type="number" name="price" value={productData.price} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
              </div>
               <div>
                <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
                <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} className="w-full border border-accent rounded-md p-2" required/>
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
          </div>
          {/* Right Column: Image & Actions */}
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold text-text-dark mb-4">Product Image</h3>
                <div className="w-full h-48 bg-ivory rounded-lg border-2 border-dashed border-accent flex items-center justify-center text-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Product Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <div className="text-text-medium">
                            <BsUpload size={32} className="mx-auto mb-2"/>
                            <p>Upload Image</p>
                        </div>
                    )}
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
                    <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-secondary transition-colors">Save Product</button>
                    <Link to={`${basePath}/products`} className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition-colors text-center">Cancel</Link>
                 </div>
              </div>
          </div>
        </form>
      </div>
    </AdminPageContainer>
  );
}
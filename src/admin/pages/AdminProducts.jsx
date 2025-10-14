import React, { useState, useEffect } from 'react';
import { BsPlusCircleFill, BsPencilSquare, BsTrash } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import apiClient from '../../api/apiClient';

const stockStatus = (stock) => {
    if (stock <= 0) return { text: 'Out of Stock', style: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { text: 'Low Stock', style: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', style: 'bg-green-100 text-green-800' };
};

export default function AdminProducts() {
  const { basePath } = useRole();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get(`/api/products/admin`);
        setProducts(response.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await apiClient.delete(`/api/products/${productId}`);
        // On success, remove the product from the local state for instant UI update
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        alert(err?.response?.data?.message || "Failed to delete product. You may not have the required permissions.");
      }
    }
  };

  if (loading) return <AdminPageContainer><div>Loading products...</div></AdminPageContainer>;
  if (error) return <AdminPageContainer><div>Error: {error}</div></AdminPageContainer>;


  return (
    <AdminPageContainer>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Manage Products</h1>
          <Link
            to={`${basePath}/products/new`}
            >
            <button className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                <BsPlusCircleFill /> Add New Product
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
           <input 
            type="text"
            placeholder="Search by product name..."
            className="w-full p-2 border border-accent rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-ivory text-text-dark">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const status = stockStatus(product.stockQuantity); 
                return (
                  <tr 
                    key={product.id} 
                    className="border-b border-accent hover:bg-ivory/50"
                  >
                    <td className="p-4 flex items-center gap-4 cursor-pointer">
                      <Link to={`${basePath}/products/view/${product.id}`} className="flex items-center gap-4">
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                        <span className="font-medium text-text-dark">{product.name}</span>
                      </Link>
                    </td>
                    
                    <td className="p-4">₹{product.price.toLocaleString()}</td>
                    <td className="p-4 font-medium">{product.stockQuantity}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.style}`}>
                        {status.text}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex gap-4">
                        <Link
                          to={`${basePath}/products/edit/${product.id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <BsPencilSquare size={16} />
                        </Link>

                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <BsTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>

                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageContainer>
  );
}
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link, useParams } from 'react-router-dom';
import AdminPageContainer from '../components/AdminPageContainer';

const sampleProducts = [
  { id: 101, img: "/assets/Dog-food.jpg", name: "Premium Dog Food 10kg", price: 1499, stock: 58, category: "Food", description: "A balanced, protein-rich formula designed for adult dogs to support muscle growth and a healthy coat. Made with real chicken and whole grains.", sku: 'PWD-F-001', dateAdded: '2025-08-01' },
  // ... other product data
];

const stockStatus = (stock) => {
    if (stock <= 0) return { text: 'Out of Stock', style: 'bg-red-100 text-red-800' };
    if (stock <= 10) return { text: 'Low Stock', style: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', style: 'bg-green-100 text-green-800' };
};

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productToView = sampleProducts.find(p => p.id === parseInt(id));
    setProduct(productToView);
  }, [id]);

  if (!product) {
    return (
      <AdminLayout>
        <div className="p-6 text-center">
            <h2 className="text-xl font-semibold">Product not found.</h2>
            <Link to="/admin/products" className="text-primary hover:underline mt-4 inline-block">← Back to Products</Link>
        </div>
      </AdminLayout>
    );
  }

  const status = stockStatus(product.stock);

  return (
    <AdminPageContainer>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Product Details</h1>
          <Link to={`/admin/products/edit/${product.id}`} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
            Edit Product
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Image Column */}
                <div className="md:col-span-1">
                    <img src={product.img} alt={product.name} className="w-full h-auto object-cover rounded-lg"/>
                </div>
                {/* Details Column */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-3xl font-bold text-text-dark">{product.name}</h2>
                    <p className="text-text-medium">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-accent py-4">
                        <div>
                            <p className="text-sm text-text-medium">Price</p>
                            <p className="font-semibold text-lg text-primary">₹{product.price.toLocaleString()}</p>
                        </div>
                         <div>
                            <p className="text-sm text-text-medium">Stock</p>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-lg">{product.stock}</p>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.style}`}>{status.text}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-text-medium">SKU</p>
                            <p className="font-semibold">{product.sku}</p>
                        </div>
                         <div>
                            <p className="text-sm text-text-medium">Category</p>
                            <p className="font-semibold">{product.category}</p>
                        </div>
                    </div>
                    <Link to="/admin/products" className="text-secondary hover:underline">← Back to Products List</Link>
                </div>
            </div>
        </div>
      </div>
    </AdminPageContainer>
  );
}
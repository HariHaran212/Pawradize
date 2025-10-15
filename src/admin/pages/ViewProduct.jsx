import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Link, useParams } from 'react-router-dom';
import AdminPageContainer from '../components/AdminPageContainer';
import apiClient from '../../api/apiClient';
import { initialProductState, StarRating, stockStatus } from '../../utils/helper';
import { useUser } from '../../context/UserContext';

export default function ViewProduct() {
  const { basePath } = useUser();
  const { id } = useParams();
  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/api/admin/products/${id}`);
        const data = response.data.data;
        setProduct(prev => ({ ...prev, ...data }));
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load product data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
      return <AdminLayout><p className="p-6 text-center">Loading product...</p></AdminLayout>;
  }

  if (error || !product) {
      return (
          <AdminLayout>
              <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold">{error || 'Product not found.'}</h2>
                  <Link to={`${basePath}/products`} className="text-primary hover:underline mt-4 inline-block">← Back to Products</Link>
              </div>
          </AdminLayout>
      );
  }

  const status = stockStatus(product.stockQuantity);

  return (
    <AdminPageContainer>
      <div className="p-6">
        <Link to={`${basePath}/products`} className="text-secondary hover:underline">← Back to Products List</Link>

        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-bold text-primary">Product Details</h1>
          <Link to={`${basePath}/products/edit/${product.id}`} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
            Edit Product
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Image Column */}
                <div className="md:col-span-1">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg" loading="lazy" />
                </div>
                {/* Details Column */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-3xl font-bold text-text-dark">{product.name}</h2>
                    <div className="flex items-center gap-2">
                        <StarRating rating={product.averageRating} />
                        <span className="text-sm text-text-medium">({product.numReviews} reviews)</span>
                    </div>
                    <p className="text-text-medium">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-accent py-4">
                        <div>
                            <p className="text-sm text-text-medium">Price</p>
                            <p className="font-semibold text-lg text-primary">₹{product.price.toLocaleString()}</p>
                        </div>
                         <div>
                            <p className="text-sm text-text-medium">Stock</p>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-lg">{product.stockQuantity}</p>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.style}`}>{status.text}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-text-medium">SKU (Product ID)</p>
                            <p className="font-semibold">{product.sku}</p>
                        </div>
                         <div>
                            <p className="text-sm text-text-medium">Category</p>
                            <p className="font-semibold">{product.category}</p>
                        </div>
                        {product.featuredSpecies && product.featuredSpecies.length > 0 && (
                            <div>
                                <p className="text-sm text-text-medium">For Pet Type(s)</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {product.featuredSpecies.map(species => (
                                        <span key={species} className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{species}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Customer Reviews Section --- */}
            <div className="bg-white p-8 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Customer Reviews</h3>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border-b border-accent pb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-text-dark">{review.authorName}</p>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-xs text-text-medium mb-2">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-text-medium">{review.text}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-text-medium">No reviews yet for this product.</p>
                )}
            </div>
        </div>
      </div>
    </AdminPageContainer>
  );
}
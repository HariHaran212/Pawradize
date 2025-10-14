import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BsStarFill, BsStarHalf, BsStar, BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
import apiClient from '../../api/apiClient';
import { useCart } from '../../context/CartContext'; // Import the useCart hook

const API_URL = import.meta.env.VITE_API_BASE_URL;


// StarRating component
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) stars.push(<BsStarFill key={i} />);
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars.push(<BsStarHalf key={i} />);
        else stars.push(<BsStar key={i} />);
    }
    return <div className="flex text-yellow-500">{stars}</div>;
};

// StarInput component
const StarInput = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex text-gray-300 space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
                <BsStarFill
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${star <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );

};

// Helper function to format dates from the backend
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/api/products/${id}`);
                setProduct(response.data.data);
            } catch (err) {
                setError("Product not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (newRating === 0 || newComment.trim() === "") {
            alert("Please provide a rating and a comment.");
            return;
        }

        try {
            const response = await apiClient.post(`/api/products/${id}/reviews`, {
                rating: newRating,
                text: newComment,
            });
            setProduct(response.data.data);
            setNewRating(0);
            setNewComment("");
            alert("Thank you for your feedback!");
        } catch (err) {
            alert("Failed to submit review. You may have already reviewed this product.");
            console.error(err);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        const itemToBuy = { ...product, quantity: 1 };
        // Navigate to checkout and pass the single item in the route's state
        navigate('/checkout', { state: { items: [itemToBuy] } });
    };
    
    if (loading) return <div className="text-center py-20">Loading product...</div>;
    if (error || !product) return <div className="text-center py-20">{error}</div>;

    // Sort reviews to show the newest first
    const sortedReviews = product.reviews ? [...product.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div className="font-poppins min-h-screen">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <Link to="/shop" className="text-primary hover:underline mb-6 inline-block">← Back to Shop</Link>
                <div className="bg-white p-8 rounded-3xl shadow-lg shadow-accent/50">
                    
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="relative">
                            {/* Corrected: Use imageUrl and name */}
                            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-2xl" loading="lazy" />
                            {product.stockQuantity === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                                    <span className="text-white font-bold text-lg uppercase tracking-wider">Out of Stock</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {/* Corrected: Use name */}
                            <h1 className="text-3xl font-bold text-text-dark">{product.name}</h1>
                            <div className="flex items-center space-x-2 mt-2 text-text-medium">
                                {/* Corrected: Use averageRating and numReviews */}
                                <StarRating rating={product.averageRating} />
                                <span>{product.averageRating.toFixed(1)}</span>
                                <span>({product.numReviews} reviews)</span>
                            </div>
                            {/* Corrected: Format price */}
                            <p className="text-3xl font-bold text-primary my-4">₹{product.price.toLocaleString()}</p>
                            <p className="text-text-medium leading-relaxed flex-grow">{product.description}</p>
                            <div className="mt-6 flex items-center space-x-4">
                                {/* {product.stockQuantity === 0 && <span className="text-red-600 font-semibold">Out of Stock</span>} */}
                                
                                <button 
                                    onClick={handleAddToCart} 
                                    className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors disabled:bg-grey-400 disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={product.stockQuantity === 0}
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    onClick={handleBuyNow} 
                                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:bg-grey-400 disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={product.stockQuantity === 0}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-accent pt-6">
                        <div onClick={() => setShowComments(!showComments)} className="flex justify-between items-center cursor-pointer">
                            {/* Corrected: Use product.numReviews */}
                            <h2 className="text-2xl font-bold text-text-dark">Reviews ({product.numReviews})</h2>
                            <FaChevronDown className={`transition-transform duration-300 ${showComments ? 'rotate-180' : ''}`} />
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showComments ? 'max-h-[1000px] mt-4' : 'max-h-0'}`}>
                            <div className="space-y-4">
                                {sortedReviews.length > 0 ? sortedReviews.map(review => (
                                    <div key={review.createdAt} className="bg-ivory p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            {/* Corrected: Use authorName and createdAt */}
                                            <h4 className="font-semibold">{review.authorName}</h4>
                                            <span className="text-xs text-text-medium">{formatDate(review.createdAt)}</span>
                                        </div>
                                        <div className="my-1"><StarRating rating={review.rating} /></div>
                                        <p className="text-sm text-text-medium">{review.text}</p>
                                    </div>
                                )) : <p className="text-sm text-text-medium">No reviews yet. Be the first to leave one!</p>}
                            </div>
                        </div>

                        {/* Leave a Review Form - this part was mostly correct */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-text-dark mb-3">Leave a Review</h3>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Your Rating</label>
                                    <StarInput rating={newRating} setRating={setNewRating} />
                                </div>
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-semibold mb-2">Your Comment</label>
                                    <textarea id="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="4" className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary" placeholder="Share your thoughts..."></textarea>
                                </div>
                                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
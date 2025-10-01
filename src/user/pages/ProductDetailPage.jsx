// src/pages/ProductDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsStarFill, BsStarHalf, BsStar, BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';

// --- Updated Data with a 'comments' array for each product ---
const sampleProducts = [
    { 
      id: 101, 
      title: "Premium Dog Food 10kg", 
      price: "₹1,499", 
      badge: "Best Seller", 
      img: "/assets/Dog-food.jpg", 
      rating: 4.8, 
      reviews: 112, 
      description: "A balanced, protein-rich formula designed for adult dogs to support muscle growth and a healthy coat. Made with real chicken and whole grains.",
      comments: [
        { id: 1, author: "Rohan S.", rating: 5, date: "2025-09-15", text: "My golden retriever absolutely loves this food. His coat has never been shinier!" },
        { id: 2, author: "Priya K.", rating: 4, date: "2025-09-10", text: "Good quality food and my dog seems to enjoy it. A bit pricey but worth it for the ingredients." },
      ]
    },
    // Add comments to other products similarly...
    { id: 102, title: "Eco-Friendly Cat Litter", price: "₹599", badge: "Eco", img: "/assets/Cat-litter.jpg", rating: 4.6, reviews: 88, description: "Made from 100% biodegradable materials, this cat litter offers superior odor control while being gentle on your cat's paws and the environment.", comments: [] },
    { id: 103, title: "Comfy Pet Bed (Medium)", price: "₹2,299", badge: "New", img: "/assets/Comfy-pet-bed.jpg", rating: 4.9, reviews: 45, description: "An orthopedic memory foam bed that provides ultimate comfort and support for your pet. The cover is machine-washable and durable.", comments: [] },
    { id: 104, title: "Interactive Feather Toy", price: "₹299", badge: "Top Rated", img: "/assets/Feather-toy.jpeg", rating: 4.7, reviews: 205, description: "Engage your cat's natural hunting instincts with this interactive feather wand. Durable, safe, and provides hours of fun.", comments: [] },
];

// StarRating component remains the same
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) stars.push(<BsStarFill key={i} />);
    else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars.push(<BsStarHalf key={i} />);
    else stars.push(<BsStar key={i} />);
  }
  return <div className="flex text-yellow-500">{stars}</div>;
};

// New component for interactive star rating input
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


export default function ProductDetailPage() {
  const { id } = useParams();
  const product = sampleProducts.find(p => p.id === parseInt(id));

  // State for existing features
  const [isFavorited, setIsFavorited] = useState(false);
  
  // State for new features
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(product?.comments || []);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  if (!product) {
    return <div className="text-center py-20">Product not found!</div>;
  }
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === "") {
        alert("Please provide a rating and a comment.");
        return;
    }
    const newReview = {
        id: Date.now(),
        author: "You", // In a real app, this would be the logged-in user's name
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        text: newComment,
    };
    setComments([newReview, ...comments]); // Add new review to the top of the list
    setNewRating(0);
    setNewComment("");
    alert("Thank you for your feedback!");
  };

  return (
    <div className="font-poppins min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/shop" className="text-primary hover:underline mb-6 inline-block">← Back to Shop</Link>
        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-accent/50">
            {/* --- Existing Product Details --- */}
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <img src={product.img} alt={product.title} className="w-full h-auto object-cover rounded-2xl" loading="lazy" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-text-dark">{product.title}</h1>
                    <div className="flex items-center space-x-2 mt-2 text-text-medium">
                        <StarRating rating={product.rating} />
                        <span>{product.rating}</span>
                        <span>({product.reviews} reviews)</span>
                    </div>
                    <p className="text-3xl font-bold text-primary my-4">{product.price}</p>
                    <p className="text-text-medium leading-relaxed flex-grow">{product.description}</p>
                    <div className="mt-6 flex items-center space-x-4">
                        <button className="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors">Add to Cart</button>
                        <button className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors">Buy Now</button>
                        <button onClick={() => setIsFavorited(!isFavorited)} className="p-3 border-2 border-accent rounded-lg text-primary hover:bg-ivory transition-colors">
                            {isFavorited ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- NEW: Reviews & Feedback Section --- */}
            <div className="mt-10 border-t border-accent pt-6">
                {/* Accordion Header */}
                <div 
                    onClick={() => setShowComments(!showComments)}
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h2 className="text-2xl font-bold text-text-dark">Reviews ({comments.length})</h2>
                    <FaChevronDown className={`transition-transform duration-300 ${showComments ? 'rotate-180' : ''}`} />
                </div>

                {/* Collapsible Comments List */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showComments ? 'max-h-[1000px] mt-4' : 'max-h-0'}`}>
                    <div className="space-y-4">
                        {comments.length > 0 ? comments.map(comment => (
                            <div key={comment.id} className="bg-ivory p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">{comment.author}</h4>
                                    <span className="text-xs text-text-medium">{comment.date}</span>
                                </div>
                                <div className="my-1"><StarRating rating={comment.rating} /></div>
                                <p className="text-sm text-text-medium">{comment.text}</p>
                            </div>
                        )) : <p className="text-sm text-text-medium">No reviews yet. Be the first to leave one!</p>}
                    </div>
                </div>

                {/* Leave a Review Form */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-text-dark mb-3">Leave a Review</h3>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Your Rating</label>
                            <StarInput rating={newRating} setRating={setNewRating} />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-semibold mb-2">Your Comment</label>
                            <textarea
                                id="comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows="4"
                                className="w-full border border-accent rounded-md p-3 focus:ring-2 focus:ring-primary"
                                placeholder="Share your thoughts about the product..."
                            ></textarea>
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
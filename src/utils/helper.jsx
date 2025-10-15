import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

// Role Based Path
export const getBasePathForRole = (role) => {
    switch (role) {
        case 'SUPER_ADMIN':
            return '/admin';
        case 'STORE_MANAGER':
            return '/manager';
        case 'ADOPTION_COORDINATOR':
            return '/adoption';
        case 'USER':
            return '/';
        default:
            return '';  // Default path for regular users
    }
};

//  Pet Helpers
export const initialPetState = {
    name: '',
    species: '',
    breed: '',
    dateOfBirth: '',
    gender: '',
    shortDescription: '',
    longDescription: '',
    price: 0,
    status: 'AVAILABLE',
    personalityTraits: [],
}

export const petTraits = ["Good with Children", "Good with Other Dogs", "Good with Cats", "Apartment Friendly", "House-Trained"];

export const getPetStatusText = (status) => {
    switch (status) {
        case 'AVAILABLE':
            return 'Available';
        case 'NOT_AVAILABLE':
            return 'Not Available';
        case 'ADOPTED':
            return 'Adopted';
        default:
            return '-';
    }
}

export const getPetStatusStyles = (status) => {
    switch (status) {
        case 'AVAILABLE':
            return 'bg-green-100 text-green-800';
        case 'NOT_AVAILABLE':
            return 'bg-red-100 text-red-800';
        case 'ADOPTED':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// Product Helpers
export const initialProductState = {
    sku: '',
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: 'Food',
    brand: '',
    featuredSpecies: [],
};


export const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];

export const stockStatus = (stockQuantity) => {
    if (stockQuantity <= 0) return { text: 'Out of Stock', style: 'bg-red-100 text-red-800' };
    if (stockQuantity <= 10) return { text: 'Low Stock', style: 'bg-yellow-100 text-yellow-800' };
    return { text: 'In Stock', style: 'bg-green-100 text-green-800' };
};

export const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
        } else {
            stars.push(<FaRegStar key={i} className="text-yellow-400" />);
        }
    }
    return <div className="flex">{stars}</div>;
};

// Orders
export const getOrderStatusStyles = (status) => {
    switch (status) {
        case "PENDING": 
            return 'bg-gray-100 text-gray-800'
        case "PROCESSING": 
            return 'bg-yellow-100 text-yellow-800'
        case "SHIPPED": 
            return 'bg-blue-100 text-blue-800'
        case "DELIVERED": 
            return 'bg-green-100 text-green-800'
        case "CANCELLED": 
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
};

// Public Content
export const initialGuideState = {
    title: '',
    slug: '',
    subtitle: '',
    author: '',
    snippet: '',
    content: '',
    heroImage: '',
    cta: {
        title: '',
        text: '',
        buttonText: '',
        buttonLink: '',
    },
    status: 'Draft',
};


// Other helpers
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    // Returns date in YYYY-MM-DD format
    return new Date(dateString).toLocaleDateString('en-CA');
};

// export const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   // Returns date in a human-readable format, e.g., "Aug 14, 2025, 2:45 AM"
//   return new Date(dateString).toLocaleDateString('en-CA', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true,
//     dateStyle: 'medium',
//     timeStyle: 'short'
//   });
// };

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

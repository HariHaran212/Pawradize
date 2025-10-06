import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import apiClient from '../../api/apiClient'; // Your centralized axios instance

// Helper function to format the date from the backend
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function FullGuidePage() {
    const { slug } = useParams();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuide = async () => {
            if (!slug) {
                setLoading(false);
                setError('No guide specified.');
                return;
            }
            try {
                const response = await apiClient.get(`/api/content/${slug}`);
                setGuide(response.data.data); // Assuming your ApiResponse wraps the object in a 'data' property
            } catch (err) {
                setError('Guide not found.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGuide();
    }, [slug]); // Re-run the effect if the slug in the URL changes

    if (loading) {
        return <PageContainer><p className="text-center py-10">Loading guide...</p></PageContainer>;
    }

    // If an error occurred or no guide was found, redirect to the main guides page
    if (error || !guide) {
        return <Navigate to="/guides" replace />;
    }


  return (
    <PageContainer>
      <article className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <p className="text-secondary font-semibold">{guide.subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2">{guide.title}</h1>
          <p className="text-text-medium mt-4">By {guide.author} • Published on {formatDate(guide.updatedAt)}</p>
        </header>

        <div className="bg-ivory rounded-2xl overflow-hidden mb-8">
          <img src={guide.heroImageUrl} alt={guide.title} className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* This renders the HTML content from your data file */}
        <div 
          className="prose lg:prose-lg max-w-none text-text-medium leading-relaxed"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />

        <footer className="mt-12 bg-ivory p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-primary">{guide.cta.title}</h3>
          <p className="text-text-medium mt-2 mb-6">{guide.cta.text}</p>
          <Link to={guide.cta.buttonLink} className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-secondary transition-colors">
            {guide.cta.buttonText}
          </Link>
        </footer>
      </article>
    </PageContainer>
  );
}
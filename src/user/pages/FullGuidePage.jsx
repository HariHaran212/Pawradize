import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { guidesData } from '../../data/guidesData';

export default function FullGuidePage() {
  const { slug } = useParams(); // Get the unique 'slug' from the URL
  const guide = guidesData.find(g => g.slug === slug);

  // If no guide with that slug is found, redirect to the main guides page
  if (!guide) {
    return <Navigate to="/guides" />;
  }

  return (
    <PageContainer>
      <article className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <p className="text-secondary font-semibold">{guide.subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2">{guide.title}</h1>
          <p className="text-text-medium mt-4">By The Pawradise Team • Published on September 28, 2025</p>
        </header>

        <div className="bg-ivory rounded-2xl overflow-hidden mb-8">
          <img src={guide.heroImage} alt={guide.title} className="w-full h-80 object-cover"/>
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
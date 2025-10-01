import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { guidesData } from '../../data/guidesData'; // Import your new data file

export default function PetGuidesHub() {
  return (
    <PageContainer>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Pawradise Pet Care Guides</h1>
        <p className="text-text-medium mt-2 max-w-2xl mx-auto">
          Your one-stop hub for expert advice. Explore our guides to give your pet the happiest, healthiest life possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guidesData.map(guide => (
          <Link 
            key={guide.slug} 
            to={`/guides/${guide.slug}`} 
            className="block bg-white rounded-2xl shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden">
              <img src={guide.heroImage} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="text-secondary font-semibold text-sm">{guide.subtitle}</p>
              <h3 className="text-xl font-bold text-text-dark mt-1">{guide.title}</h3>
              <p className="text-text-medium text-sm mt-2">{guide.snippet}</p>
              <span className="inline-block mt-4 font-semibold text-primary group-hover:underline">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
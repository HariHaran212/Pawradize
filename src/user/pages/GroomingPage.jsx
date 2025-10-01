import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { FaCut, FaShower, FaPaw } from 'react-icons/fa';

export default function GroomingPage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="bg-ivory rounded-2xl p-8 md:p-12 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Professional Pampering for Your Pet</h1>
        <p className="text-text-medium mt-4 max-w-2xl mx-auto">
          Our expert groomers provide a calm and caring experience, leaving your pet looking, feeling, and smelling their absolute best.
        </p>
        <Link 
          to="/contact" 
          className="inline-block mt-6 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-secondary transition-colors"
        >
          Book a Session
        </Link>
      </div>

      {/* Services Offered Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-text-dark text-center mb-8">Our Grooming Services</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Service Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <FaShower className="text-secondary mx-auto mb-4" size={40} />
            <h3 className="font-bold text-xl text-primary">Bath & Brush</h3>
            <p className="text-text-medium text-sm mt-2">A refreshing wash with pet-safe shampoo, conditioner, a full blow-dry, and a thorough brushing to remove loose fur.</p>
          </div>
          {/* Service Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <FaCut className="text-secondary mx-auto mb-4" size={40} />
            <h3 className="font-bold text-xl text-primary">Full Groom & Style</h3>
            <p className="text-text-medium text-sm mt-2">Includes a bath, brush, and a professional haircut styled to your preference or breed standard.</p>
          </div>
          {/* Service Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <FaPaw className="text-secondary mx-auto mb-4" size={40} />
            <h3 className="font-bold text-xl text-primary">Spa Add-Ons</h3>
            <p className="text-text-medium text-sm mt-2">Enhance their visit with nail trimming, ear cleaning, teeth brushing, or a de-shedding treatment.</p>
          </div>
        </div>
      </div>
      
      {/* Pricing Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-text-dark text-center mb-6">Pricing</h2>
        <div className="max-w-xl mx-auto text-text-medium">
            <div className="flex justify-between py-3 border-b border-accent"><p>Bath & Brush (Small Pet)</p><p className="font-semibold">from ₹899</p></div>
            <div className="flex justify-between py-3 border-b border-accent"><p>Bath & Brush (Large Pet)</p><p className="font-semibold">from ₹1,499</p></div>
            <div className="flex justify-between py-3 border-b border-accent"><p>Full Groom (Small Pet)</p><p className="font-semibold">from ₹1,699</p></div>
            <div className="flex justify-between py-3"><p>Full Groom (Large Pet)</p><p className="font-semibold">from ₹2,499</p></div>
        </div>
      </div>
    </PageContainer>
  );
}
import React from 'react';
import PageContainer from '../../components/PageContainer';
import { FaStethoscope } from 'react-icons/fa';

const vetPartners = [
    { name: "Coimbatore Pet Clinic", location: "R.S. Puram", phone: "+91-123-456-7890" },
    { name: "Sai Pet Care Center", location: "Saibaba Colony", phone: "+91-234-567-8901" },
    { name: "Ganga Vet Hospital", location: "Gandhipuram", phone: "+91-345-678-9012" },
];

export default function HealthPage() {
  return (
    <PageContainer>
      <div className="text-center mb-12">
        <FaStethoscope className="text-teal mx-auto mb-4" size={48}/>
        <h1 className="text-4xl md:text-5xl font-bold text-teal">Your Partner in Pet Wellness</h1>
        <p className="text-text-medium mt-4 max-w-2xl mx-auto">
          At Pawradise, we believe proactive health care is key to a long, happy life for your pet. We've partnered with some of the most trusted veterinary clinics in Coimbatore to provide you with access to the best care.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-text-dark text-center mb-8">Our Veterinary Partners in Coimbatore</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {vetPartners.map(vet => (
                <div key={vet.name} className="bg-ivory p-6 rounded-xl text-center">
                    <h3 className="font-bold text-lg text-primary">{vet.name}</h3>
                    <p className="text-sm text-text-medium mt-1">{vet.location}</p>
                    <a href={`tel:${vet.phone}`} className="inline-block mt-4 bg-white text-teal font-semibold px-6 py-2 rounded-lg border border-teal hover:bg-teal hover:text-white transition-colors">
                        Contact Clinic
                    </a>
                </div>
            ))}
        </div>
        <p className="text-xs text-text-medium text-center mt-8">*Please contact clinics directly for appointments and emergency services. Pawradise does not provide medical advice.*</p>
      </div>
    </PageContainer>
  );
}
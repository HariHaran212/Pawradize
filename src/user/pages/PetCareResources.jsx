import React, { useState } from 'react';
// Importing icons for the accordion
import { BsBook, BsPinMapFill } from 'react-icons/bs'; // Removed BsWhistle
import { FaLeaf, FaChevronDown, FaBullhorn } from 'react-icons/fa'; // Replaced FaWhistle with FaBullhorn
import PageContainer from '../../components/PageContainer';
import PetCareGuides from '../components/PetCareGuides';

const resources = [
  {
    id: 1,
    icon: <BsBook className="text-secondary" size={24} />,
    title: "New Pet Care Guides",
    shortDescription: "Step-by-step guides for puppies, kittens, birds and small pets.",
    longDescription: "Our comprehensive guides cover everything from the first 24 hours with your new pet to house training, socialization, and creating a safe environment. Find checklists and essential tips tailored for your pet's specific needs.",
  },
  {
    id: 2,
    icon: <FaLeaf className="text-primary" size={24} />,
    title: "Nutrition & Diet",
    shortDescription: "Balanced diets, feeding schedules, and safe human foods to avoid.",
    longDescription: "Learn the fundamentals of pet nutrition, including how to read pet food labels, the benefits of different types of diets (kibble, wet, raw), and a detailed list of toxic vs. safe foods. We also provide feeding calculators based on age and activity level.",
  },
  {
    id: 3,
    icon: <FaBullhorn className="text-teal" size={24} />,
    title: "Training Tips & Tricks",
    shortDescription: "Positive reinforcement, crate training, leash manners and more.",
    longDescription: "Unlock your pet's potential with our positive reinforcement training guides. We cover essential commands, strategies for correcting common behavioral issues like barking or chewing, and advanced tips for agility and socialization.",
  },
  {
    id: 4,
    icon: <BsPinMapFill className="text-peach" size={24} />,
    title: "Coimbatore Pet Directory",
    shortDescription: "Vets, groomers, trainers, and pet-friendly parks near you.",
    longDescription: "Our curated local directory lists the best pet services in Coimbatore. Find emergency vet clinics, top-rated groomers, certified trainers, and beautiful pet-friendly parks and cafes to explore with your companion.",
  },
];


export default function PetCareResources() {
  // State to track which accordion item is currently open
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    // If the clicked item is already open, close it. Otherwise, open the new one.
    setOpenId(openId === id ? null : id);
  };

  return (
    <PageContainer>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Pet Care Resources</h1>
        <p className="max-w-2xl mx-auto text-text-medium mb-12">
          Your one-stop hub for expert advice. Explore our guides to give your pet the happiest, healthiest life possible.
        </p>
      </div>

      {/* --- Featured Guide Section --- */}
      <PetCareGuides />

      <h2 className="text-2xl md:text-3xl font-bold text-primary mt-16 mb-8 text-center">Additional Resources</h2>


      {/* --- Interactive Accordion Section --- */}
      <div className="space-y-4">
        {resources.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md transition-all duration-300">
            <div 
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleAccordion(item.id)}
            >
              <div className="flex items-center space-x-4">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-lg text-text-dark">{item.title}</h3>
                  <p className="text-sm text-text-medium">{item.shortDescription}</p>
                </div>
              </div>
              <FaChevronDown 
                className={`text-primary transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {/* Collapsible Content */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openId === item.id ? 'max-h-96' : 'max-h-0'}`}
            >
              <div className="px-6 pb-6 pt-2 border-t border-grey">
                <p className="text-text-medium leading-relaxed">
                  {item.longDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
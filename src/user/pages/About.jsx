import React from "react";
import { BsStars, BsHeartPulseFill, BsCalendarEvent } from 'react-icons/bs';
import PageContainer from "../../components/PageContainer";

export default function About() {
  return (
    // Applied base styles: font, background color, and default text color
    <PageContainer>
        
      {/* Section 1: Introduction */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Pawradise</h1>
        <p className="max-w-3xl mx-auto leading-relaxed">
          Welcome to Pawradise, a place born from a simple yet profound love for animals. We are a Coimbatore-based pet hub dedicated to connecting families with their future furry, feathered, or scaled members. We're more than just a store; we're a community for pet lovers.
        </p>
      </div>

      {/* Section 2: Our Story */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Our Story</h2>
        <p className="leading-relaxed">
          Pawradise began with a stray dog, a warm blanket, and the realization that every animal deserves a loving home. Our founder, a lifelong Coimbatore resident and animal advocate, noticed a gap between local pet parents seeking quality products and the wonderful, handcrafted goods made right here in our community. Pawradise was created to bridge that gap, offering a curated selection of essentials while fostering a network of care, support, and responsible pet ownership.
        </p>
      </div>
      
      {/* Section 3: Mission & Values */}
      <div className="space-y-8 my-6">
        <div className="bg-highlight/80 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-black">Our Mission</h3>
          <p className="mt-3 text-text-dark">
            To create a trusted, compassionate, and comprehensive home for pets and their parents across Coimbatore by providing expert guidance, high-quality products, and a supportive community for a lifetime of companionship.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* --- Our Services Section --- */}
            {/* <div className="grid md:grid-cols-3 gap-8 text-center"> */}

              {/* Card 1: Grooming Services */}
              <div className="bg-white p-8 rounded-2xl shadow-lg shadow-grey hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Icon */}
                <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-highlight rounded-full">
                  <BsStars className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Pamper & Groom</h3>
                <p className="text-text-medium mb-4">
                  From stylish trims to relaxing spa baths, our professional grooming services will leave your pet feeling fresh and looking fabulous.
                </p>
                <a href="/grooming" className="font-semibold text-secondary hover:underline">
                  Book a Session →
                </a>
              </div>

              {/* Card 2: Health & Wellness */}
              <div className="bg-white p-8 rounded-2xl shadow-lg shadow-grey hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Icon */}
                <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-teal/10 rounded-full">
                  <BsHeartPulseFill className="w-8 h-8 text-teal" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Health & Wellness</h3>
                <p className="text-text-medium mb-4">
                  We've partnered with trusted Coimbatore veterinarians to provide health check-ups, nutritional advice, and wellness support.
                </p>
                <a href="/health" className="font-semibold text-teal hover:underline">
                  Find a Vet →
                </a>
              </div>

              {/* Card 3: Community Events */}
              <div className="bg-white p-8 rounded-2xl shadow-lg shadow-grey hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Icon */}
                <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-peach/10 rounded-full">
                  <BsCalendarEvent className="w-8 h-8 text-peach" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Join Our Community</h3>
                <p className="text-text-medium mb-4">
                  Participate in our fun workshops, training sessions, and local adoption drives. Connect with fellow pet lovers in Coimbatore!
                </p>
                <a href="/events" className="font-semibold text-peach hover:underline">
                  See Events →
                </a>
              </div>

            {/* </div> */}
          </div>
        </div>
      </div>
      
      {/* Section 4: Visit Us */}
      <div className="bg-white p-6 rounded-2xl shadow-lg shadow-grey">
        <h3 className="text-2xl font-bold">Visit Our Store</h3>
        <p className="text-md text-text-medium my-3">R.S. Puram, Coimbatore, Tamil Nadu 641002</p>
        <div className="mt-4 w-full h-72 bg-gray-100 rounded-md overflow-hidden">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.65799988771!2d76.9443696803833!3d11.00683524169557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859bc8b73c467%3A0x89197a7f5a339a6!2sR.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </PageContainer>
  );
}
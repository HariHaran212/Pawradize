import React from 'react';
// Importing icons for the store info section
import { BsGeoAltFill, BsClockFill, BsTelephoneFill, BsEnvelopeFill } from 'react-icons/bs';
import PageContainer from '../../components/PageContainer';

export default function Contact() {
  // Based on the current time (Wednesday ~10:30 PM), the store is closed.
  const isStoreOpen = false;

  return (
    <PageContainer>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get In Touch</h1>
        <p className="max-w-2xl mx-auto text-text-medium mb-12">
          We'd love to hear from you! Whether you have a question about our products, the adoption process, or just want to say hello, feel free to reach out.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        
        {/* --- Enhanced Contact Form --- */}
        <form className="bg-white p-8 rounded-2xl shadow-lg shadow-grey space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-text-dark">Your Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full bg-ivory/50 border border-accent rounded-md p-3 text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-text-dark">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full bg-ivory/50 border border-accent rounded-md p-3 text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-text-dark">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              className="w-full bg-ivory/50 border border-accent rounded-md p-3 text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" 
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300"
          >
            Send Message
          </button>
        </form>

        {/* --- Enhanced Store Info --- */}
        <div className="space-y-6">
          <div className="bg-ivory p-8 rounded-2xl text-text-dark">
            <h3 className="font-bold text-xl text-primary mb-4">Visit or Call Us</h3>
            
            <div className="flex items-start space-x-3 mb-4">
              <BsGeoAltFill className="text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">123 Pet Lane, R.S. Puram,<br/>Coimbatore, Tamil Nadu 641002</p>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <BsClockFill className="text-primary flex-shrink-0" />
              <p className="text-sm font-medium">Mon - Sat: 10:00 AM - 7:00 PM</p>
              <span className={`text-xs px-2 py-1 rounded-full ${isStoreOpen ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-900'}`}>
                {isStoreOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 mb-4">
              <BsTelephoneFill className="text-primary flex-shrink-0" />
              <a href="tel:+911234567890" className="text-sm hover:text-primary transition">+91 12345 67890</a>
            </div>

            <div className="flex items-center space-x-3">
              <BsEnvelopeFill className="text-primary flex-shrink-0" />
              <a href="mailto:hello@pawradise.example" className="text-sm hover:text-primary transition">hello@pawradise.example</a>
            </div>
          </div>
          
          {/* Map Preview */}
          <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-grey">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15665.65799988771!2d76.9443696803833!3d11.00683524169557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859bc8b73c467%3A0x89197a7f5a339a6!2sR.S.%20Puram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
      </div>
    </PageContainer>
  );
}
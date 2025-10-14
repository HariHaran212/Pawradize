import React, { useEffect, useState } from 'react';
// Importing icons for the store info section
import { BsGeoAltFill, BsClockFill, BsTelephoneFill, BsEnvelopeFill } from 'react-icons/bs';
import PageContainer from '../../components/PageContainer';
import apiClient from '../../api/apiClient';
import { useUser } from '../../context/UserContext';

export default function Contact() {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
      const checkStoreStatus = () => {
          const now = new Date();
          const day = now.getDay(); // Sunday = 0, Saturday = 6
          const hour = now.getHours();
          // Open Mon-Sat (1-6), 10 AM to 7 PM (19:00)
          setIsStoreOpen(day >= 1 && day <= 6 && hour >= 10 && hour < 19);
      };
      checkStoreStatus();
      const interval = setInterval(checkStoreStatus, 60000);
      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await apiClient.get('/api/public/info/contact');
                setStoreInfo(response.data.data);
            } catch (error) {
                console.error("Failed to load contact info", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContactInfo();
    }, []);
  
  // --- Form State and Handlers ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState({ loading: false, error: '', success: false });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (user) {
          formData.name = user.name;
          formData.email = user.email;
      }
      if (!formData.name || !formData.email || !formData.message) {
          setFormState({ loading: false, error: 'All fields are required.', success: false });
          return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setFormState({ loading: false, error: 'Please enter a valid email address.', success: false });
          return;
      }
      if (formData.message.length < 10) {
          setFormState({ loading: false, error: 'Message should be at least 10 characters long.', success: false });
          return;
      }

      setFormState({ loading: true, error: '', success: false });

      try {
          await apiClient.post('/api/contact', formData);
          setFormState({ loading: false, error: '', success: true });
          setFormData({ name: '', email: '', message: '' }); // Clear form
      } catch (err) {
          const errorMessage = err.response?.data?.message || "Failed to send message.";
          setFormState({ loading: false, error: errorMessage, success: false });
      }
  };

  if (loading) return <PageContainer><p>Loading...</p></PageContainer>;

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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg shadow-grey space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2 text-text-dark">Your Name</label>
            <input 
              type="text" 
              id="name" 
              onChange={handleChange}
              className="w-full bg-ivory/50 border border-accent rounded-md p-3 text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" 
              placeholder="John Doe" 
              disabled={!!user}
              value={user ? user.name : formData.name}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-text-dark">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={user ? user.email : formData.email}
              onChange={handleChange}
              className="w-full bg-ivory/50 border border-accent rounded-md p-3 text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" 
              placeholder="you@example.com" 
              disabled={!!user}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-text-dark">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-ivory/50 border border-accent rounded-md p-3 text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" 
              placeholder="Your message here..."  
            ></textarea>
          </div>
          {formState.success && <p className="text-green-600">Message sent successfully!</p>}
          {formState.error && <p className="text-red-600">{formState.error}</p>}
          <button type="submit" disabled={formState.loading} className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300">
              {formState.loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* --- Enhanced Store Info --- */}
        <div className="space-y-6">
          <div className="bg-ivory p-8 rounded-2xl text-text-dark">
            <h3 className="font-bold text-xl text-primary mb-4">Visit or Call Us</h3>
            
            <div className="flex items-start space-x-3 mb-4">
              <BsGeoAltFill className="text-primary mt-1 flex-shrink-0" />
              <p className="text-sm">{storeInfo?.storeAddress}</p>
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
              <a href={`tel:${storeInfo?.storePhone}`} className="text-sm hover:text-primary transition">{storeInfo?.storePhone}</a>
            </div>

            <div className="flex items-center space-x-3">
              <BsEnvelopeFill className="text-primary flex-shrink-0" />
              <a href={`mailto:${storeInfo?.storeEmail}`} className="text-sm hover:text-primary transition">{storeInfo?.storeEmail}</a>
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
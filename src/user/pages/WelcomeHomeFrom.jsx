import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import { useUser } from "../../context/UserContext";
import apiClient from "../../api/apiClient";

export default function WelcomeHomeForm() {
	const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
            }));
        }
    }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');

      try {
          await apiClient.post('/api/visit-requests', {
              petId: id,
              ...formData,
          });
          alert("Application submitted! We'll contact you soon.");
          navigate(`/pet/${id}`); // Navigate back to the pet's detail page
      } catch (err) {
          setError(err?.response?.data?.message || 'Failed to submit application. Please try again.');
          console.error(err);
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
    <PageContainer>
      <Link to="/find-a-friend" className="text-primary hover:underline mb-6 inline-block">← Back to all pets</Link>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Apply to Welcome Home a Pet
        </h1>
        <p className="text-center text-text-medium mb-8">
          Fill out this form to start your adoption journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
					{/* Pet Id */}
					<div>
            <label className="block font-medium text-text-dark mb-1">
              Pet Id
            </label>
            <input
							type="text"
							name="pet-id"
							value={id}
							className="w-full px-4 py-2 border border-accent rounded-lg bg-gray-100 cursor-not-allowed no-focus"
							readOnly
							tabIndex={-1}
						/>
          </div>
          {/* Full Name */}
          <div>
            <label className="block font-medium text-text-dark mb-1">
              Your Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-text-dark mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-text-dark mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium text-text-dark mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium text-text-dark mb-1">
              Why do you want to adopt?
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}

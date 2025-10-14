import React, { useState } from 'react';
import apiClient from '../../api/apiClient';

const PasswordChangeModal = ({ isOpen, onClose }) => {
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        // Reset state when closing the modal
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setError('');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setIsSubmitting(true);
        try {
            // Make the API call to the backend
            await apiClient.post('/api/profile/change-password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
            });

            alert("Password changed successfully!");
            handleClose(); // Close and reset the modal on success

        } catch (err) {
            // Display the specific error message from the backend
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-primary mb-6">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Old Password</label>
                        <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handleChange} className="w-full border border-accent rounded-md p-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">New Password</label>
                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange} className="w-full border border-accent rounded-md p-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} className="w-full border border-accent rounded-md p-3" required />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    
                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={handleClose} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                            Cancel
                        </button>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
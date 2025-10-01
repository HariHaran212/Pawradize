import React, { useState } from 'react';

const PasswordChangeModal = ({ isOpen, onClose }) => {
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        console.log("Submitting new password data:", passwordData);
        alert("Password changed successfully!");
        onClose();
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
                        <button type="button" onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">
                            Cancel
                        </button>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition">
                            Save Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
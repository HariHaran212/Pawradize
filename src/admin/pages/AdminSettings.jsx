import React, { useEffect, useState } from 'react';
import AdminPageContainer from '../components/AdminPageContainer';
import PasswordChangeModal from '../../user/components/PasswordChangeModel';
import apiClient from '../../api/apiClient';

// Reusable Toggle Switch component
const ToggleSwitch = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between py-2 border-b border-accent">
        <span className="text-text-dark">{label}</span>
        <button onClick={onChange} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);

// Password Change Modal component
// const PasswordChangeModal = ({ isOpen, onClose }) => {
//     // (This is the same modal component from the previous responses)
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
//             <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-primary mb-6">Change Password</h2>
//                 <form className="space-y-4">
//                     <div><label className="block text-sm font-semibold mb-2">Old Password</label><input type="password" name="oldPassword" className="w-full border border-accent rounded-md p-3" required /></div>
//                     <div><label className="block text-sm font-semibold mb-2">New Password</label><input type="password" name="newPassword" className="w-full border border-accent rounded-md p-3" required /></div>
//                     <div><label className="block text-sm font-semibold mb-2">Confirm New Password</label><input type="password" name="confirmPassword" className="w-full border border-accent rounded-md p-3" required /></div>
//                     <div className="flex gap-4 pt-4">
//                         <button type="button" onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
//                         <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition">Save Password</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

export default function AdminSettings() {

  const [settings, setSettings] = useState({
      newUserEmail: true,
      newOrderEmail: true,
      lowStockAlerts: false,
      storeAddress: '',
      storePhone: '+91 ',
      storeEmail: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Fetch initial settings on component mount
  useEffect(() => {
      const fetchSettings = async () => {
          try {
              const response = await apiClient.get('/api/admin/settings');
              setSettings(response.data.data);
          } catch (err) {
              setError(err.response?.data?.message || 'Failed to load settings.');
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
      fetchSettings();
  }, []);

  const handleToggle = (key) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveChanges = async () => {
      try {
          await apiClient.put('/api/admin/settings', settings);
          alert("Settings saved successfully!");
      } catch (err) {
          alert("Failed to save settings.");
          console.error(err);
      }
  };
  
  if (loading) return <AdminPageContainer><p>Loading settings...</p></AdminPageContainer>;
  if (error) return <AdminPageContainer><p className="text-red-500">{error}</p></AdminPageContainer>;

  return (
    <>
      <PasswordChangeModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      <AdminPageContainer>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary mb-6">Admin Settings</h1>
      
          
          <div className="max-w-2xl mx-auto space-y-8 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold text-text-dark mb-4">Store Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Store Address</label>
                        <input type="text" name="storeAddress" value={settings.storeAddress || ''} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Store Phone</label>
                        <input type="text" name="storePhone" value={settings.storePhone || ''} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Store Email</label>
                        <input type="email" name="storeEmail" value={settings.storeEmail || ''} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                    </div>
                </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
              {/* Notifications Section */}
              <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h2 className="text-xl font-semibold text-text-dark mb-2">Notifications</h2>
                  <p className="text-sm text-text-medium mb-4">Manage email notifications for important events.</p>
                  <div>
                      <ToggleSwitch label="Email on new user signup" enabled={settings.newUserEmail} onChange={() => handleToggle('newUserEmail')} />
                      <ToggleSwitch label="Email on new order" enabled={settings.newOrderEmail} onChange={() => handleToggle('newOrderEmail')} />
                      <ToggleSwitch label="Email on low stock alerts" enabled={settings.lowStockAlerts} onChange={() => handleToggle('lowStockAlerts')} />
                  </div>
              </div>
              
              {/* Security Section */}
              <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h2 className="text-xl font-semibold text-text-dark mb-4">Security</h2>
                  <div className="space-y-3">
                      <button onClick={() => setIsPasswordModalOpen(true)} className="w-full text-left font-medium text-primary hover:underline">Change Your Password</button>
                  </div>
              </div>

              {/* Save Button */}
              <div className="text-right">
                  <button onClick={handleSaveChanges} className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition-colors">Save Changes</button>
              </div>
          </div>
        </div>
      </AdminPageContainer>
    </>
  );
}
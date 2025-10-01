import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import PasswordChangeModal from '../components/PasswordChangeModel';

// A reusable Toggle Switch component
const ToggleSwitch = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between">
        <span className="text-text-dark">{label}</span>
        <button 
            onClick={onChange}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailPromotions: true,
    emailOrderUpdates: true,
    smsNotifications: false,
  });
  
  // State to control the password modal visibility
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const handleSaveChanges = () => {
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        console.log("Deleting account...");
        alert("Account deleted.");
    }
  };

  return (
    <>
      <PageContainer>
          <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
          <p className="text-text-medium mb-8">Manage your notifications and account preferences.</p>

          <div className="space-y-8">
              {/* Notifications Section */}
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-accent/50">
                  <h2 className="text-xl font-semibold text-text-dark mb-4">Notifications</h2>
                  <div className="space-y-4">
                      <ToggleSwitch 
                          label="Email about promotions and news" 
                          enabled={settings.emailPromotions}
                          onChange={() => handleToggle('emailPromotions')}
                      />
                      <ToggleSwitch 
                          label="Email about order updates" 
                          enabled={settings.emailOrderUpdates}
                          onChange={() => handleToggle('emailOrderUpdates')}
                      />
                      <ToggleSwitch 
                          label="SMS notifications" 
                          enabled={settings.smsNotifications}
                          onChange={() => handleToggle('smsNotifications')}
                      />
                  </div>
              </div>
              
              {/* Account Section */}
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-accent/50">
                  <h2 className="text-xl font-semibold text-text-dark mb-4">Account</h2>
                  <div className="space-y-3">
                      <button onClick={() => setIsPasswordModalOpen(true)} className="w-full text-left font-medium text-primary hover:underline">
                        Change Password
                      </button>
                      <button onClick={handleDeleteAccount} className="w-full text-left font-medium text-red-500 hover:underline">
                        Delete Account
                      </button>
                  </div>
              </div>

              {/* Save Button */}
              <div className="text-right">
                  <button 
                      onClick={handleSaveChanges} 
                      className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                      Save Changes
                  </button>
              </div>
          </div>
          <PasswordChangeModal 
            isOpen={isPasswordModalOpen} 
            onClose={() => setIsPasswordModalOpen(false)} 
            />
      </PageContainer>
    </>
  );
}
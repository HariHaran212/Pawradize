import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';
import AdminPageContainer from '../components/AdminPageContainer';

// Sample data for the logged-in admin
const initialProfileData = {
  name: 'John Doe',
  email: 'admin.john@pawradise.com',
  phone: '+91 9876543210',
  role: 'Super Admin',
  avatar: 'https://via.placeholder.com/100',
};

// Helper component for the OTP flow
const OtpFlow = ({ fieldType, verificationState, onSend, onVerify, onOtpChange }) => {
    if (verificationState.verified) return null;
    return (
        <div className="mt-2">
            <button type="button" onClick={() => onSend(fieldType)} className="text-xs text-secondary font-semibold">Send OTP to verify</button>
            {verificationState.otpSent && (
                <div className="flex gap-2 mt-2">
                    <input type="text" placeholder="Enter OTP" value={verificationState.otp} onChange={(e) => onOtpChange(e, fieldType)} className="w-full border border-accent rounded-md p-2 text-sm" />
                    <button type="button" onClick={() => onVerify(fieldType)} className="px-4 py-1 bg-secondary text-primary rounded-lg text-sm font-semibold">Verify</button>
                </div>
            )}
        </div>
    );
};

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [initialDataOnEdit, setInitialDataOnEdit] = useState(initialProfileData);
  
  const [verification, setVerification] = useState({
    phone: { otpSent: false, otp: '', verified: true },
    email: { otpSent: false, otp: '', verified: true },
  });

  const fileInputRef = useRef(null);

  // --- Handlers (similar to the user-facing profile page) ---
  const handleEditClick = () => { setInitialDataOnEdit(profileData); setIsEditing(true); };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (name === 'email' || name === 'phone') {
      const isChanged = value !== initialDataOnEdit[name];
      setVerification(prev => ({ ...prev, [name]: { ...prev[name], verified: !isChanged, otpSent: false, otp: '' } }));
    }
  };
  const handleOtpInputChange = (e, fieldType) => { setVerification(prev => ({ ...prev, [fieldType]: { ...prev[fieldType], otp: e.target.value } })); };
  const handleSendOtp = (fieldType) => { alert(`OTP sent to ${profileData[fieldType]}`); setVerification(prev => ({ ...prev, [fieldType]: { ...prev[fieldType], otpSent: true } })); };
  const handleVerifyOtp = (fieldType) => {
    if (verification[fieldType].otp === '123456') {
      alert(`${fieldType} verified successfully!`);
      setVerification(prev => ({ ...prev, [fieldType]: { ...prev[fieldType], verified: true, otpSent: false } }));
      setInitialDataOnEdit(prev => ({...prev, [fieldType]: profileData[fieldType]}));
    } else { alert('Invalid OTP.'); }
  };
  const handleImageChange = (e) => { if (e.target.files[0]) { setProfileData(prev => ({ ...prev, avatar: URL.createObjectURL(e.target.files[0]) })); } };
  const handleSave = () => {
    if (!verification.phone.verified || !verification.email.verified) { alert("Please verify all changes."); return; }
    console.log("Admin Profile saved:", profileData);
    setInitialDataOnEdit(profileData);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setProfileData(initialDataOnEdit);
    setIsEditing(false);
    setVerification({ phone: { otpSent: false, otp: '', verified: true }, email: { otpSent: false, otp: '', verified: true } });
  };

  return (
    <AdminPageContainer>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">Your Profile</h1>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-accent pb-6 mb-6">
            <div className="relative group">
              <img src={profileData.avatar} alt="Admin Avatar" className="w-24 h-24 rounded-full border-4 border-secondary object-cover" loading="lazy" />
              {isEditing && (
                <div onClick={() => fileInputRef.current.click()} className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <FaCamera size={24} />
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left w-full">
              {isEditing ? (
                <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="text-2xl font-bold text-primary bg-ivory rounded-md p-2 w-full" />
              ) : (
                <h1 className="text-2xl font-bold text-primary">{profileData.name}</h1>
              )}
              <p className="text-text-medium">{profileData.role}</p>
            </div>
          </div>
          {/* Form Area */}
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm font-medium">Email:</label>
                  <div className="relative"><input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />{verification.email.verified && <BsShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}</div>
                  <OtpFlow fieldType="email" verificationState={verification.email} onSend={handleSendOtp} onVerify={handleVerifyOtp} onOtpChange={handleOtpInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone:</label>
                  <div className="relative"><input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />{verification.phone.verified && <BsShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}</div>
                  <OtpFlow fieldType="phone" verificationState={verification.phone} onSend={handleSendOtp} onVerify={handleVerifyOtp} onOtpChange={handleOtpInputChange} />
                </div>
              </>
            ) : (
              <>
                <p><span className="font-medium text-text-dark">Email:</span> {profileData.email}</p>
                <p><span className="font-medium text-text-dark">Phone:</span> {profileData.phone}</p>
              </>
            )}
            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50" disabled={!verification.phone.verified || !verification.email.verified}>Save Changes</button>
                  <button onClick={handleCancel} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                </>
              ) : (
                <button onClick={handleEditClick} className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition">Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageContainer>
  );
}
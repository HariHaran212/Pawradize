import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';
import PageContainer from '../../components/PageContainer';
import PasswordChangeModal from '../components/PasswordChangeModel';

const initialProfileData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '+91 9876543210',
  address: 'Coimbatore, India',
  age: 21,
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
                    <button type="button" onClick={() => onVerify(fieldType)} className="px-4 py-1 bg-secondary text-white rounded-lg text-sm font-semibold">Verify</button>
                </div>
            )}
        </div>
    );
};

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [initialDataOnEdit, setInitialDataOnEdit] = useState(initialProfileData);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // State for modal
  
  const [verification, setVerification] = useState({
    phone: { otpSent: false, otp: '', verified: true },
    email: { otpSent: false, otp: '', verified: true },
  });

  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setInitialDataOnEdit(profileData);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));

    if (name === 'email' || name === 'phone') {
      const isChanged = value !== initialDataOnEdit[name];
      setVerification(prev => ({
        ...prev,
        [name]: { ...prev[name], verified: !isChanged, otpSent: false, otp: '' },
      }));
    }
  };

  const handleOtpInputChange = (e, fieldType) => {
    setVerification(prev => ({ ...prev, [fieldType]: { ...prev[fieldType], otp: e.target.value } }));
  };

  const handleSendOtp = (fieldType) => {
    alert(`OTP sent to ${profileData[fieldType]}`);
    setVerification(prev => ({ ...prev, [fieldType]: { ...prev[fieldType], otpSent: true } }));
  };

  const handleVerifyOtp = (fieldType) => {
    if (verification[fieldType].otp === '123456') {
      alert(`${fieldType} verified successfully!`);
      setVerification(prev => ({ ...prev, [fieldType]: { ...prev[fieldType], verified: true, otpSent: false } }));
      setInitialDataOnEdit(prev => ({...prev, [fieldType]: profileData[fieldType]}));
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData(prev => ({ ...prev, avatar: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSave = () => {
    if (!verification.phone.verified || !verification.email.verified) {
        alert("Please verify all changes before saving.");
        return;
    }
    console.log("Profile saved:", profileData);
    setInitialDataOnEdit(profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData(initialDataOnEdit);
    setIsEditing(false);
    setVerification({
        phone: { otpSent: false, otp: '', verified: true },
        email: { otpSent: false, otp: '', verified: true },
    });
  };

  return (
    <>
      <PageContainer>
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-accent pb-6 mb-6">
          <div className="relative group">
            <img src={profileData.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-secondary object-cover" loading="lazy" />
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
            <p className="text-text-medium">{profileData.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-ivory rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-primary">Personal Information</h2>
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm font-medium">Email:</label>
                  <div className="relative">
                    <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                    {verification.email.verified && <BsShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
                  </div>
                  <OtpFlow fieldType="email" verificationState={verification.email} onSend={handleSendOtp} onVerify={handleVerifyOtp} onOtpChange={handleOtpInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone:</label>
                  <div className="relative">
                    <input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                    {verification.phone.verified && <BsShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
                  </div>
                  <OtpFlow fieldType="phone" verificationState={verification.phone} onSend={handleSendOtp} onVerify={handleVerifyOtp} onOtpChange={handleOtpInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium">Address:</label>
                  <input type="text" name="address" value={profileData.address} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Age:</label>
                  <input type="number" name="age" value={profileData.age} onChange={handleInputChange} className="w-full mt-1 border border-accent rounded-md p-2" />
                </div>
              </>
            ) : (
              <>
                <p><span className="font-medium text-text-dark">Email:</span> {profileData.email}</p>
                <p><span className="font-medium text-text-dark">Phone:</span> {profileData.phone}</p>
                <p><span className="font-medium text-text-dark">Address:</span> {profileData.address}</p>
                <p><span className="font-medium text-text-dark">Age:</span> {profileData.age}</p>
              </>
            )}
          </div>

          <div className="bg-ivory rounded-lg p-6 flex flex-col justify-start">
              <h2 className="text-lg font-semibold text-primary mb-3">Account Settings</h2>
              {isEditing ? (
                <div className="flex flex-col space-y-3">
                  <button onClick={handleSave} className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50" disabled={!verification.phone.verified || !verification.email.verified}>Save Changes</button>
                  <button onClick={handleCancel} className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                    <button onClick={handleEditClick} className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary transition">Edit Profile</button>
                    <button onClick={() => setIsPasswordModalOpen(true)} className="w-full bg-secondary text-white py-2 px-4 rounded-lg font-semibold hover:bg-secondary/85 transition">Change Password</button>
                </div>
              )}
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
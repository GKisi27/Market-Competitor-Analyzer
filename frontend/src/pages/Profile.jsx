import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateCurrentUser } from '../services/api';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AccountSettingsCard from '../components/Profile/AccountSettingsCard';
import SideCard from '../components/Profile/SideCard';

import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '', email: '',
    currentPassword: '', newPassword: '', confirmNewPassword: ''
  });

  useEffect(() => { fetchUser(); }, []);

  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      setFormData(f => ({ ...f, full_name: userData.full_name, email: userData.email }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => setFormData(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleUpdate = async e => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match"); return;
    }
    try {
      const payload = { full_name: formData.full_name, email: formData.email };
      if (formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }
      await updateCurrentUser(payload);
      alert("Profile updated successfully");
      fetchUser();
      setFormData(f => ({ ...f, currentPassword: '', newPassword: '', confirmNewPassword: '' }));
      setEditOpen(false);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update profile");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return (
    <div className="bg-[var(--bg-primary)] min-h-screen flex items-center justify-center text-lg">
      Loading...
    </div>
  );

  return (
    <div className="page">
      <Navbar />
      <div className="px-15 py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-1 text-sm">View or update your account information.</p>
        </div>

        <ProfileHeader 
          user={user} 
          onEditToggle={() => setEditOpen(!editOpen)} 
          editOpen={editOpen} 
        />

        <div className="flex gap-6 items-start">
          {editOpen && (
            <AccountSettingsCard 
              formData={formData} 
              handleChange={handleChange} 
              handleUpdate={handleUpdate} 
            />
          )}
          
          <SideCard handleSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
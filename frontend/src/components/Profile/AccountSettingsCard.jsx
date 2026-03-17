import React from 'react';

const AccountSettingsCard = ({ formData, handleChange, handleUpdate }) => {
  return (
    <div className="card flex-1 p-8">

      <h3 className="text-lg font-bold mb-1">Account Settings</h3>
      <div className="h-px bg-[var(--border)] mb-6" />

      <form onSubmit={handleUpdate} className="flex flex-col gap-5 text-sm">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Full Name</label>
          <input
            name="full_name"
            value={formData.full_name || ''}
            onChange={handleChange}
            type="text"
            className="input-field"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-400 font-medium">Email Address</label>
          <input
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            type="email"
            className="input-field"
          />
        </div>

        <div className="mt-2">
          <h4 className="text-base font-bold mb-1">Change Password</h4>
          <div className="h-px bg-[var(--border)] mb-5" />
          <div className="flex flex-col gap-5">

        {/* Current Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-400 font-medium">Current Password</label>
              <input
                name="currentPassword"
                value={formData.currentPassword || ''}
                onChange={handleChange}
                type="password"
                placeholder="Required to change password"
                className="input-field"
              />
            </div>

        {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-400 font-medium">New Password</label>
              <input
                name="newPassword"
                value={formData.newPassword || ''}
                onChange={handleChange}
                type="password"
                className="input-field"
              />
            </div>

        {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-400 font-medium">Confirm New Password</label>
              <input
                name="confirmNewPassword"
                value={formData.confirmNewPassword || ''}
                onChange={handleChange}
                type="password"
                className="input-field"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
        >
          Save Changes
        </button>
      </form>

    </div>
  );
};

export default AccountSettingsCard;

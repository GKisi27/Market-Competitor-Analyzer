import React from 'react';

const AccountSettingsCard = ({ formData, handleChange }) => {
  return (
    <div className="bg-[#1B2537] w-207.5 rounded-xl p-10 font-semibold text-[24px] flex flex-col ">

      <p className="text-white">Account Settings</p>
      <div className="h-px w-full bg-white mt-2.5"></div>

      {/* Full Name */}
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="fullName" className="text-white">
          Full Name:
        </label>
        <input
          id="fullName"
          name="name"
          type="text"
          className="flex-1 bg-white rounded-lg h-10 outline-none text-black px-2 mr-15"
        />
      </div>

      {/* Email */}
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="email" className="text-white ">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="flex-1 bg-white rounded-lg h-10 outline-none text-black px-2 mr-15"
        />
      </div>

      <p className="mt-6 text-white">Change Password</p>
      <div className="h-px w-full bg-white mt-2.5"></div>

      {/* Current Password */}
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="currentPassword" className="text-white ">
          Current Password:
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          className="flex-1 bg-white rounded-lg h-10 outline-none text-black px-2 mr-15"
        />
      </div>

      {/* New Password */}
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="newPassword" className="text-white ">
          New Password:
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          className="flex-1 bg-white rounded-lg h-10 outline-none text-black px-2 mr-15"
        />
      </div>

      {/* Confirm Password */}
      <div className="mt-3 flex items-center gap-3">
        <label htmlFor="confirmNewPassword" className="text-white ">
          Confirm Password:
        </label>
        <input
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          className="flex-1 bg-white rounded-lg h-10 outline-none text-black px-2 mr-15"
        />
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white px-6 py-2 rounded-lg text-base transition"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
};

export default AccountSettingsCard;

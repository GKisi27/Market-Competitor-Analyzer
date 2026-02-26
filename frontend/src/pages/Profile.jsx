import React, { useState } from 'react'
import ProfileHeader from '../components/Profile/ProfileHeader.jsx'
import AccountSettingsCard from '../components/Profile/AccountSettingsCard.jsx'
import SideCard from '../components/Profile/SideCard.jsx'

const Profile = () => {

  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
    // handle input change
    // const handleChange = (e) => {
    //   setformdata({
    //     ...formdata,
    //     [e.target.name]: e.target.value
    //   });
    // }

  return (
     <div className='bg-[#141A28] px-15 text-white min-h-screen'>
      <div className='py-7.5'>
        <p className='font-semibold text-[36px] '>Profile</p>
        <p className='py-2.5'>View or update your account information.</p>
      </div>

      <ProfileHeader />

      <div className='flex mt-10 gap-10 '>
        <AccountSettingsCard />
        <SideCard />
      </div>
    </div>
  )
}

export default Profile

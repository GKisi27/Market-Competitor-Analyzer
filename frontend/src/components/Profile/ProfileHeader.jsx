import React from 'react';

const ProfileHeader = () => {
  return (
    <div className='bg-[#1B2537] h-70 w-330 rounded-xl flex items-center p-10 gap-10 '>
      <div className='bg-gray-400 w-50 h-50 rounded-full flex items-center justify-center'></div>

      <div className='font-semibold'>
        <p className='text-[32px] '>Anish Shrestha</p>
        <p className='text-[24px] text-[#B9B9B9]'>anishshrestha@gmail.com</p>
        <p className='text-[24px] text-[#797979]'>Admin</p>
      </div>

      <div className='ml-auto self-end'>
        <button className='w-54 h-12.25 bg-blue-600 hover:bg-blue-700  rounded-lg font-semibold text-2xl py-0.5 hover:cursor-pointer'>
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default ProfileHeader;

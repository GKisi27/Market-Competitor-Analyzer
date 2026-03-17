import React from 'react'

const Welcome = () => {
  const firstName = localStorage.getItem('user_first_name') || 'User';

  return (
    <div className='flex flex-col items-start px-15 mt-3'>
        <p className='text-base' >Welcome to your Dashboard</p>
        <h2 className='text-2xl'>Hi {firstName}</h2>
    </div>
  )
}

export default Welcome
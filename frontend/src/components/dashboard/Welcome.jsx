import React from 'react'

const Welcome = () => {
  return (
    <div className='flex flex-col items-start px-15 mt-8 transition-colors duration-500'>
        {/* Sub-text: Gray in light mode, lighter gray in dark mode */}
        <p className='text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide' >
            Welcome to your Dashboard
        </p>
        
        {/* Main Heading: Dark navy in light mode, pure white in dark mode */}
        <h2 className='text-4xl font-bold text-gray-900 dark:text-white mt-2'>
            Hi User 👋
        </h2>
    </div>
  )
}

export default Welcome
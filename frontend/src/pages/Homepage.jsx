import React from 'react'
import HomeNav from '../components/homepage/HomeNav'
import HeroSection from '../components/homepage/HeroSection'
import Facilities from '../components/homepage/Facilities'
import HowItWorks from '../components/homepage/HowItWorks'
import Footer from '../components/homepage/Footer'

const Homepage = () => {
  return (
    /* This line is the "magic". It says: Be white normally, be navy in dark mode. */
    <div className='bg-white dark:bg-[#141A28] w-full min-h-screen text-gray-900 dark:text-white transition-colors duration-500'>
      <HomeNav/>
      <HeroSection/>
      <Facilities/>
      <HowItWorks/>
      <Footer/>
    </div>
  )
}

export default Homepage
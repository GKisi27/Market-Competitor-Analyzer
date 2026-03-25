import React from 'react'
import HomeNav from '../components/homepage/HomeNav'
import HeroSection from '../components/homepage/HeroSection'
import Facilities from '../components/homepage/Facilities'
import HowItWorks from '../components/homepage/HowItWorks'
import Footer from '../components/homepage/Footer'

const Homepage = () => {
  return (
    <div className='page'>
      <HomeNav/>
      <HeroSection/>
      <Facilities/>
      <HowItWorks/>
      <Footer/>
    </div>
  )
}

export default Homepage
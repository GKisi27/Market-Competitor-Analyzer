import React from 'react'
import Navbar from '../components/Navbar'
import TopSection from '../components/priceindex/TopSection'
import ChartSection from '../components/priceindex/ChartSection'
import CoursePriceSection from '../components/priceindex/CoursePriceSection'

const PriceIndex = () => {
  return (
    <div className='bg-[#141A28] h-full w-full'> 
      <Navbar/>
      <TopSection/>
      <ChartSection/>
      <CoursePriceSection/>
    </div>
  )
}

export default PriceIndex
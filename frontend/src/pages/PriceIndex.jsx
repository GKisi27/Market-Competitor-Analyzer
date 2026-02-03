import React from 'react'
import Navbar from '../components/Navbar'
import TopSection from '../components/priceindex/TopSection'
import ChartSection from '../components/priceindex/ChartSection'

const PriceIndex = () => {
  return (
    <div className='bg-[#141A28] h-screen w-full'> 
      <Navbar/>
      <TopSection/>
      <ChartSection/>
    </div>
  )
}

export default PriceIndex
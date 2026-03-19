import React from 'react'
import Navbar from '../components/Navbar'
import TopSection from '../components/priceIndex/TopSection'
import ChartSection from '../components/priceIndex/ChartSection'
import CoursePriceSection from '../components/priceIndex/CoursePriceSection'

const PriceIndex = () => {
  return (
    <div className='page'>
      <Navbar/>
      <TopSection/>
      <ChartSection/>
      <CoursePriceSection/>
    </div>
  )
}

export default PriceIndex
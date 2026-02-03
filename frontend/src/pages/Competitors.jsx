import React from 'react'
import Navbar from '../components/Navbar'
import Reports from '../components/Reports'
import CompetitorReport from '../components/CompetitorReport'
import CompetitorList from '../components/CompetitorList'

const Competitors = () => {
  return (
    <div className='bg-[#141A28] w-full min-h-screen'>
      <Navbar/>
      <CompetitorReport/>
      <CompetitorList/>
    </div>
  )
}

export default Competitors
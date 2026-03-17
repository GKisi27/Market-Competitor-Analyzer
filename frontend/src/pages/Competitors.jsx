import React from 'react'
import Navbar from '../components/Navbar'
import CompetitorReport from '../components/competitors/CompetitorReport'
import CompetitorList from '../components/competitors/CompetitorList'

const Competitors = () => {
  return (
    <div className='page'>
      <Navbar/>
      <CompetitorReport/>
      <CompetitorList/>
    </div>
  )
}

export default Competitors
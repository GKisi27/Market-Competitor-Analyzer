import React from 'react'
import GapAnalysisTop from '../components/gapAnalysis/GapAnalysisTOp'
import Navbar from '../components/Navbar'
import GapChartSection from '../components/gapAnalysis/GapChartSection'

const GapAnalysis = () => {
  return (
    <div className='bg-[#141A28] h-full w-full' >
      <Navbar/>
      <GapAnalysisTop/>
      <GapChartSection/>
    </div>
  )
}

export default GapAnalysis
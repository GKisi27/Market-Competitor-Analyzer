import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PriceIndex from './pages/PriceIndex'
import GapAnalysis from './pages/GapAnalysis'
import Competitors from './pages/Competitors'
import CompetitorsDetails from './pages/CompetitorsDetails'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element ={<Dashboard/>}/>
        <Route path='/price-index' element={<PriceIndex/>} />
        <Route path='/gap-analysis' element ={<GapAnalysis/>} />
        <Route path='/competitors' element = {<Competitors/>} />
        <Route path='competitors:id' element = {<CompetitorsDetails/>} /> 
       </Routes>
    </div>
  )
}

export default App
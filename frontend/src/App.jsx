import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PriceIndex from './pages/PriceIndex'
import GapAnalysis from './pages/GapAnalysis'
import Competitors from './pages/Competitors'
import CompetitorsDetails from './pages/CompetitorsDetails'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import Login from './components/Login'
import SIgnUp from './components/SIgnUp'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element ={<Homepage/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/signup' element ={<SIgnUp/>}/>
        <Route path='/dashboard' element ={<Dashboard/>}/>
        <Route path='/price-index' element={<PriceIndex/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/gap-analysis' element ={<GapAnalysis/>} />
        <Route path='/competitors' element = {<Competitors/>} />
        <Route path='competitors-details' element = {<CompetitorsDetails/>} /> 

       </Routes>
    </div>
  )
}

export default App
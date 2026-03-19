import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Dashboard from './pages/Dashboard'
import PriceIndex from './pages/PriceIndex'
import GapAnalysis from './pages/GapAnalysis'
import Competitors from './pages/Competitors'
import CompetitorsDetails from './pages/CompetitorsDetails'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import Login from './components/Login'
import SignUp from './components/SignUp'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/dashboard" />;
  return children;
};


const App = () => {
  const token = localStorage.getItem('token');

  return (
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>} />

        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/price-index' element={<ProtectedRoute><PriceIndex /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/gap-analysis' element={<ProtectedRoute><GapAnalysis /></ProtectedRoute>} />
        <Route path='/competitors' element={<ProtectedRoute><Competitors /></ProtectedRoute>} />
        <Route path='/competitors/:id' element={<ProtectedRoute><CompetitorsDetails /></ProtectedRoute>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
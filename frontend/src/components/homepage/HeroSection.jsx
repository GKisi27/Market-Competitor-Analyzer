import React from 'react'
import { useNavigate } from 'react-router-dom'
// 1. Correct import path for your image
import heroImage from '../../assets/heroimage.jpg'; 

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-15 pt-10 transition-colors duration-500">
      <div className="flex justify-between items-center gap-10">
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold leading-tight text-gray-900 dark:text-white transition-colors">
            Bridging the Gap in <br />
            <span className="text-[#10B981]">Institutional Excellence</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
            Unlock actionable insights with gap analysis, price analysis, trends, 
            reports for modern organization.
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="mt-10 bg-[#025E90] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#014a72] transition-all active:scale-95 shadow-lg"
          >
            Get Started
          </button>
        </div>

        {/* Right Content - THE IMAGE IS BACK HERE */}
        <div className="relative group">
           <img 
              src={heroImage} 
              alt="Dashboard Preview" 
              className="w-[550px] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-transform duration-500 group-hover:scale-105"
           />
           {/* Decorative glow effect for dark mode */}
           <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
        </div>
      </div>

      {/* The 3 Feature Cards at the bottom */}
      <div className="grid grid-cols-3 gap-8 mt-20">
        <div className="p-8 rounded-2xl bg-white dark:bg-[#1B2537] border border-gray-200 dark:border-none shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="text-3xl mb-4">💰</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Realtime Price Tracking</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Automatically track competitor price changes instantly.</p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-[#1B2537] border border-gray-200 dark:border-none shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Competitor</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Identify and track your top market competitors easily.</p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-[#1B2537] border border-gray-200 dark:border-none shadow-sm hover:shadow-xl transition-all duration-500">
          <div className="text-3xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Competitor SWOT Mapping</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Identify company strengths and weaknesses at a glance.</p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
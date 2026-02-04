import React from 'react'

const GapAnalysisTop = () => {
  return (
    <div>

         <div className="text-white px-15 mt-5">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Gap Score Analysis</h2>
          <p className="text-normal font-semibold leading-5">
            Market gap assessment shown
          </p>
        </div>

        <div className="flex justify-between items-center px-3 gap-5">
          <div className="flex flex-col justify-center  text-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">15</h2>
            <p className="text-normal">Total Gap Courses</p>
          </div>
          <div className="flex flex-col justify-center  text-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">28</h2>
            <p className="text-normal">Courses we offered</p>
          </div>
          <div className="flex flex-col justify-center  text-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">15</h2>
            <p className="text-normal">Avg.courses per competitor</p>
          </div>
          <div className="flex flex-col justify-center  text-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">70</h2>
            <p className="text-normal">Market Relevence Score</p>
          </div>


         
        </div>
      </div>
    </div>
    </div>
  )
}

export default GapAnalysisTop
import React from 'react'
import PriceChart from '../PriceChart'
import GapChart from '../GapChart'

const ChartsGroup = () => {
  return (
    <div className='w-full flex justify-between items-center mt-10 px-15 gap-4'>

        {/* the charts are imported from components  */}
       <div className='w-1/2'>
         <PriceChart/>
       </div>
      <div className='w-1/2'>
          <GapChart/>
      </div>
    </div>
  )
}

export default ChartsGroup
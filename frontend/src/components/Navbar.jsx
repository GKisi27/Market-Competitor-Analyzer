import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoMca from '../assets/logoMca.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faGear, faUser, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const [searchtext, setSearchtext] = useState('')

    const navigate = useNavigate()
    const searchHandler =(e)=>{
        e.preventDefault()
        setSearchtext('')
    }

  return (
    <div className='bg-[#1B2537] h-22.5 flex justify-between items-center w-full px-15 '>
        <div className='w-18 h-10 '>
            <img onClick={()=>{
                navigate('/')
}} className='h-full w-full' src={logoMca} alt="" />
        
        </div>
        <form onSubmit={searchHandler} className='bg-[#141A28] w-87.5 h-10 p-3 rounded-lg flex justify-between items-center '> 
            {/* <p className='text-gray-500'>Search</p> */}
            <input className='text-white w-4/5 outline-none'
            placeholder='Search'

             onChange={(e)=>{
                setSearchtext(e.target.value)

             }}
            value={searchtext} type="text" />
            <button type='submit' > <FontAwesomeIcon className='text-lg text-gray-500 active:scale-110' icon={faMagnifyingGlass} /></button>

        </form>

        <div className='text-white flex justify-between items-center gap-3.5 '>
            <FontAwesomeIcon className='text-2xl' icon={faFilter} />
             <FontAwesomeIcon className='text-2xl' icon={faGear} />
            <FontAwesomeIcon className='text-2xl' icon={faUser} />
        </div> 
    </div>
  )
}

export default Navbar
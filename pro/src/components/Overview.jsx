import React from 'react'
import notfound from '../assets/notfound.svg'
import { Link } from 'react-router-dom';
import add from '../assets/add.svg';
import DeleteModal from './DeleteModal'


function Overview() {
   
  return (
    <div>
    
 
    <div className='flex justify-between'>
       <div className='flex items-center justify-center text-3xl text-[#247B7B] font-bold'>
           Overview 
       </div>
       <div>
        <div className="flex items-center mt-2">
          <label htmlFor="dateRange" className="mr-2">Date Range</label>
          <input type="date" id="dateRange" name="dateRange" className="border p-2 rounded" />
          <input type="date" id="dateRange" name="dateRange" className="border p-2 rounded ml-2" />
        </div>
       </div>
    </div>

    <div>
      <div className="flex-grow h-full w-full flex items-center justify-center">
        <img src={notfound} className="h-100 w-100 mx-auto" alt="" />
      </div>
    <div className='w-full text-center mt-11 font-semibold'>No activity yet. Create anew campaign to get started</div>

      <div className="flex-grow h-full w-full flex items-center justify-center mt-5">
        
        <Link to="/New" className="flex items-center mt-5 py-2 my-3 px-4 rounded-lg bg-[#247B7B] text-[white] hover:opacity-50]">
          <img src={add} alt="New" className="h-6 mr-2 transition-colors duration-300" />
          <span>New Campaign</span>
        </Link>
       
      </div>
    </div>
    </div>
  )
}

export default Overview
import React from 'react'
import search from '../assets/search.svg'
import alert from '../assets/alert.svg'
import avatarr from '../assets/avatarr.svg'


const Navbar = () => {
  return (
    <div className=' flex justify-between align-middle  py-3 border-b border-[#F3F3F3]'>
        <div className='relative' style={{ width: '300px' }}>
  <input 
    className='p-2 mt-2 pr-10 rounded border-[1px] border-[#999999] bg-[#FFFFFA] focus:outline-none focus:border-[#999999] w-full'  
    type="text" 
    placeholder='search...' 
  />
  <img 
    src={search} 
    alt="" 
    className='absolute right-2 top-7 transform -translate-y-1/2'
  />
</div>

<div className='flex items-center'>
  <span className='pb-3 pe-2'><img src={alert} alt="" /></span>
  <span><img src={avatarr} alt="" /></span>
</div>
    </div>
  )
}

export default Navbar
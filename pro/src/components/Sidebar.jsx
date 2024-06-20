import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import over from '../assets/over.svg';
import campaignI from '../assets/campaign.svg';
import market from '../assets/market.svg';
import account from '../assets/account.svg';
import add from '../assets/add.svg';
import question from '../assets/question.svg';

function Sidebar() {
  return (
    <div className="bg-[#F0F4F4] text-[#455454] w-64 py-8 px-4 flex flex-col items-center fixed h-screen">
      {/* Logo */}
      <div className="mb-8 flex items-center py-2 px-3">
        <img src={Logo} alt="Logo" className="h-12 px-5 pt-2" /> <div className=' font-bold text-[30px]'>Scrutz</div>
      </div>

      {/* Links */}
      <nav className="space-y-4 font-medium">
        <Link to="/New" className="flex items-center py-2 px-4 rounded-lg bg-[#247B7B] text-[white] hover:bg-white hover:text-[#247B7B]">
          <img src={add} alt="New" className="h-6 mr-2 transition-colors duration-300" />
          <span>New Campaign</span>
        </Link>
        <Link to="/Overview" className="flex items-center py-2 px-4 rounded-lg hover:bg-white hover:text-[#247B7B]">
          <img src={over} alt="Overview" className="h-6 mr-2 transition-colors duration-300" />
          <span>Overview</span>
        </Link>
        <Link to="/Campaign" className="flex items-center py-2 px-4 rounded-lg hover:bg-white hover:text-[#247B7B]">
          <img src={campaignI} alt="Campaign" className="h-6 mr-2 transition-colors duration-300" />
          <span>Campaign</span>
        </Link>
        <Link className="flex items-center py-2 px-4 rounded-lg hover:bg-white hover:text-[#247B7B]">
          <img src={market} alt="Market Intelligence" className="h-6 mr-2 transition-colors duration-300" />
          <span>Market Intelligence</span>
        </Link>
        <Link  className="flex items-center py-2 px-4 rounded-lg hover:bg-white hover:text-[#247B7B]">
          <img src={account} alt="Account Settings" className="h-6 mr-2 transition-colors duration-300" />
          <span>Account Settings</span>
        </Link>
        <div className=' text-center bg-[white] px-5 py-3 rounded-md'>
               <div>
                 <img className=' mx-auto' src={question} alt="" />
               </div>
               <div>
                  <h4 className='my-1 <h4 className="my-1 bg-gradient-to-r-custom bg-clip-text text-transparent font-semibold">Need help?</h4>
'>Need help?</h4>
                  <h4 className=' text-[#666666] font-semibold'>Were readily available to provide help</h4>
                  <button className="border-[1px] p-2 px-5 my-5 rounded-md te border-[#247B7B] text-[#247B7B] font-semibold hover:bg-[#247B7B] hover:text-[white]">Get help</button>
               </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;







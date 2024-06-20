import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function Layout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      
      <div className="flex-1  px-16 ms-60">
       <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;


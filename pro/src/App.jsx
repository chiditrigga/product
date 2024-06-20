import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import Overview from './components/Overview';
import Campaign from './components/Campaing';
import New from './components/New';
import CampaignDetails from './components/CampaignDetails';
import './App.css';
import Edit from './components/Edit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}> 
      <Route index element={<Overview />} /> 
      <Route path="overview" element={<Overview />} />
      <Route path="campaign" element={<Campaign />} />
      <Route path="new" element={<New />} />
      <Route path="campaign/:id" element={<CampaignDetails />} />
      <Route path="edit/:id" element={<Edit />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;



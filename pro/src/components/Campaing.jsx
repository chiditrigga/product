import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import search from '../assets/search.svg';
import eye from '../assets/eye.svg';
import edit from '../assets/editt.svg';
import deletee from '../assets/del.svg';
import DeleteModal from './DeleteModal';

const fetchCampaigns = async () => {
  const response = await fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign');
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const deleteCampaign = async (id) => {
  const response = await fetch(`https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const Campaign = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentCampaign, setCurrentCampaign] = React.useState({ id: '', name: '' });

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  });

  const mutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
     
    },
  });

  const handleDelete = (id, name) => {
    setCurrentCampaign({ id, name });
    setIsModalOpen(true);
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filter || campaign.campaignStatus.includes(filter))
  );

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  return (
    <div>
      {isModalOpen && (
        <DeleteModal
          campaignId={currentCampaign.id}
          campaignName={currentCampaign.name}
          onClose={() => setIsModalOpen(false)}
          deleteCampaign={mutation}
        />
      )}
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          <p className="text-center text-lg mt-4">Loading...</p>
        </div>
      )}

      {!isLoading && (
        <div className=' '>
          <h1 className="text-2xl text-[#247B7B] font-semibold mb-4">All Campaigns</h1>

          <div className="flex">
            <div className="flex items-center">
              <button
                className={`mr-4 font-medium text-[#247B7BC9] p-1 py-2 px-5 rounded border-[1px] border-solid border-[#2A9D8FD1] ${filter === '' ? 'bg-[#247B7B] text-white' : ''} hover:bg-[#247B7B] hover:text-white`}
                onClick={() => setFilter('')}
              >
                All
              </button>
              <button
                className={`mr-4 font-medium text-[#247B7BC9] p-1 py-2 px-5 rounded border-[1px] border-solid border-[#2A9D8FD1] ${filter === 'active' ? 'bg-[#247B7B] text-white' : ''} hover:bg-[#247B7B] hover:text-white`}
                onClick={() => setFilter('active')}
              >
                Inactive
              </button>
              <button
                className={`font-medium text-[#247B7BC9] p-1 py-2 px-5 rounded border-[1px] border-solid border-[#2A9D8FD1] ${filter === 'inactive' ? 'bg-[#247B7B] text-white' : ''} hover:bg-[#247B7B] hover:text-white`}
                onClick={() => setFilter('inactive')}
              >
                Active
              </button>
            </div>
            <div className="flex items-center pb-4 justify-end ml-auto">
              <div className="relative">
                <input
                  className="p-2 mt-2 pr-10 rounded border-[1px] border-[#999999] bg-[#FFFFFA] focus:outline-none focus:border-[#999999] w-full"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="search..."
                />
                <img src={search} alt="" className="absolute right-2 top-7 transform -translate-y-1/2" />
              </div>
              <div className="flex items-center ml-4">
                <label htmlFor="dateRange" className="mr-2">Date Range</label>
                <input
                  type="date"
                  id="dateRange"
                  className="p-2 rounded border-[1px] border-[#999999] bg-[#FFFFFA] focus:outline-none focus:border-[#999999] w-full"
                />
              </div>
              <div className="flex items-center ml-4">
                <label htmlFor="dateRange" className="mr-2">Date Range</label>
                <input
                  type="date"
                  id="dateRange"
                  className="p-2 rounded border-[1px] border-[#999999] bg-[#FFFFFA] focus:outline-none focus:border-[#999999] w-full"
                />
              </div>
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-[#F0F4F4] text-[#455454] font-bold">
              <tr className="text-center">
                <th className="w-1/12 py-2">S/N</th>
                <th className="w-3/12 py-2">Campaign name</th>
                <th className="w-2/12 py-2">Start date</th>
                <th className="w-2/12 py-2">Status</th>
                <th className="w-2/12 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((campaign, index) => (
                <tr key={index}>
                  <td className="py-2 text-[#666666] font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="py-2 text-[#666666] font-medium">{campaign.campaignName}</td>
                  <td className="py-2 text-[#666666] font-medium">{campaign.startDate}</td>
                  <td className={`py-2 font-bold ${campaign.campaignStatus === 'Inactive' ? 'text-[#990000]' : campaign.campaignStatus === 'Active' ? 'text-green-500' : ''}`}>{campaign.campaignStatus}</td>
                  <td className="py-2">
                    <span className="inline-flex items-center justify-center space-x-2">
                      <button onClick={() => navigate(`/campaign/${campaign.id}`)} className="px-2">
                        <img src={eye} className="w-6 h-6" alt="" />
                      </button>
                      <button onClick={() => navigate(`/edit/${campaign.id}`)} className="px-2">
                        <img src={edit} alt="" />
                      </button>
                      <button onClick={() => handleDelete(campaign.id, campaign.campaignName)} className="px-2">
                        <img src={deletee} alt="" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full flex items-center justify-center mt-4">
            {currentPage > 1 && (
              <button className="mr-2 px-4 py-2 bg-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(currentPage - 1)}>Previous</button>
            )}
            {currentPage > 1 && (
              <button className="mr-2 px-4 py-2 border-[1px] border-[#247B7B] text-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(1)}>1</button>
            )}
            {currentPage > 2 && (
              <button className="mr-2 px-4 py-2 border-[1px] border-[#247B7B] text-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(currentPage - 1)}>...</button>
            )}
            <button className="px-4 py-2 border-[1px] border-[#247B7B] text-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(currentPage)}>{currentPage}</button>
            {currentPage < totalPages - 1 && (
              <button className="ml-2 px-4 py-2 border-[1px] border-[#247B7B] text-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(currentPage + 1)}>...</button>
            )}
            {currentPage < totalPages && (
              <button className="ml-2 px-4 py-2 border-[1px] border-[#247B7B] text-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(totalPages)}>{totalPages}</button>
            )}
            {currentPage < totalPages && (
              <button className="ml-2 px-4 py-2 bg-[#247B7B] rounded-full hover:bg-white hover:text-[#247B7B] transition-colors duration-300" onClick={() => paginate(currentPage + 1)}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaign;

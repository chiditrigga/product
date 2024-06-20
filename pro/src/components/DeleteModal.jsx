import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

export default function Modal({ campaignId, campaignName, onClose, deleteCampaign }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteCampaign.mutate(campaignId, {
      onSuccess: () => {
        setOpen(false); // Close the modal
        onClose(); // Close the modal
        alert('Campaign deleted successfully!');
      },
    });
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => { setOpen(false); onClose(); }}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 py-10 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 sm:p-6 sm:pb-8">
                  <div className=' text-[18px] font-semibold text-center mb-6'>Stop Campaign</div>
                  <hr />
                  <div className='text-center font-medium my-10 text-[#666666] mb-6'>
                    Are you sure you want to delete the {campaignName} campaign?
                    This action cannot be undone.
                  </div>
                  <div className='flex justify-center mt-10'>
                    <button className='bg-white border border-solid border-[#000000] text-[#333333] font-semibold py-2 px-12 mr-4 rounded-md hover:bg-[#F3F3F3]' onClick={() => { setOpen(false); onClose(); }}>Cancel</button>
                    <button className='bg-[#990000] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#990000]/70' onClick={handleDelete}>Delete Campaign</button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

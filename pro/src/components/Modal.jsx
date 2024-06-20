import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import success from '../assets/success.svg'
import { useNavigate } from 'react-router-dom';


export default function Modal() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate();

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 py-16 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 py-6 sm:p-6 sm:pb-4">
                     
                  <img className='mx-auto mb-4 my-6' src={success} alt="" />
                  <div className='text-center  font-medium my-3 text-[#666666] mb-4'>
                  Campingn Successfully Created!
                  </div>
                  <div>
                    <button
                    onClick={() => navigate(`/`)}
                    className="mx-auto mt-4 w-full sm:w-auto flex justify-center rounded-md border border-[#247B7B] bg-[#247B7B] px-6 py-2 text-white font-bold hover:bg-[#247B7B]/70">
                      Go Back to campaign list
                    </button>
                  </div>
                </div>
               
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

import React from 'react';
import { useFormik } from 'formik';
import Modal from './Modal'


const New = () => {
    const [showModal, setShowModal] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            campaign:'a',
            campaignName: '',
            campaignDescription: '',
            startDate: '',
            endDate: '',
            digestCampaign: false,
            linkedKeywords: [""],
            dailyDigest: '',
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                const response = await fetch('https://infinion-test-int-test.azurewebsites.net/api/Campaign', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                console.log('Campaign created:', data);
                setShowModal(true);
               
            } catch (error) {
                console.error('Error creating campaign:', error);
              
            }
        },
    });

    // Helper function to handle array field changes
    const handleArrayFieldChange = (index) => (event) => {
        const newLinkedKeywords = [...formik.values.linkedKeywords];
        newLinkedKeywords[index] = event.target.value;
        formik.setFieldValue('linkedKeywords', newLinkedKeywords);
    };

    return (
        <>
        {showModal && <Modal />}
        <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-4/6 gap-y-4 mt-5">
           
            <h1 className="text-2xl text-[#247B7B] font-bold mb-4 mt-1">Create New Campaign</h1>
            <div className="w-full">
                <label htmlFor="campaignName" className='font-medium text-[#666666]'>Campaign Name</label>
                <input
                    id="campaignName"
                    name="campaignName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.campaignName}
                    className="w-full border border-[#999999] rounded mt-1 py-1 focus:outline-none focus:border-[#999999]"
                />
            </div>
            <div className="w-full">
                <label htmlFor="campaignDescription " className='font-medium text-[#666666] pb-2'>Campaign Description</label><textarea
    id="campaignDescription"
    name="campaignDescription"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.campaignDescription}
    className="w-full border mt-1 border-[#999999] rounded focus:outline-none focus:border-[#999999] h-32 resize-none"
/>


            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between font-medium text-[#666666] pb-1">
                    <div>
                        <label htmlFor="startDate">Start Date</label>
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date</label>
                    </div>
                </div>
                <div className="flex justify-between gap-x-4">
                    <div className="w-full">
                        <input
                            id="startDate"
                            name="startDate"
                            type="datetime-local"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startDate}
                            className=' w-full border border-[#999999] p-1 rounded focus:outline-none focus:border-[#999999]'
                        />
                    </div>
                    <div className="w-full">
                        <input
                            id="endDate"
                            name="endDate"
                            type="datetime-local"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.endDate}
                            className=' w-full border border-[#999999] p-1 rounded focus:outline-none focus:border-[#999999]'
                        />
                    </div>
                </div>
            </div>
            <div className="w-full mt-8">
            <div className="toggle-container flex justify-between">
  <label htmlFor="digestCampaign" className="font-medium text-[#666666]">Want to receive daily digest about the campaign?</label>
  <label className="toggle-switch">
    <input
      id="digestCampaign"
      name="digestCampaign"
      type="checkbox"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      checked={formik.values.digestCampaign}
    />
    <span className="slider"></span>
  </label>
</div>

            </div>
            {/* Handling array input for linkedKeywords */}
            <label htmlFor="linkedKeywords" className="font-medium text-[#666666]">Linked Keywords</label>
            
                <ul className="flex flex-wrap w-full">
                    {formik.values.linkedKeywords.map((keyword, index) => (
                        <li key={index} className="mr-2 mb-2 w-full">
                            <textarea
                                name={`linkedKeywords[${index}]`}
                
                                onChange={handleArrayFieldChange(index)}
                                value={keyword}
                                className="border border-[#999999] resize-none px-2 py-1 rounded focus:outline-none w-full focus:border-[#999999]  h-20"
                            />
                        </li>
                    ))}
                </ul>
            
            <div className="flex flex-col">
                <label htmlFor="dailyDigest" className="font-medium text-[#666666] ">Kindly select how often you want to receive daily digest</label>
                <div className="w-fit mb-4">
                    <select
                        className="w-full border border-[#999999] p-2 px-6 mt-1 rounded focus:outline-none focus:border-[#999999]"
                        id="dailyDigest"
                        name="dailyDigest"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dailyDigest}
                    >
                        <option value="">Select</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-between w-fit pb-10">
                
                <button
                    type="button"
                    className="border rounded me-3 font-semibold  border-solid text-[#247B7B] hover:text-white hover:bg-[#247B7B] border-[#247B7B] px-16 py-2"
                    onClick={() => window.history.back()}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="border rounded ms-4 hover:bg-[white] hover:text-[#247B7B] text-white font-semibold border-solid border-[#247B7B] px-16 py-2 bg-[#247B7B]"
                >
                    Create Campaign
                </button>
            </div>
       
        </div>
        </form>
        </>
    );
};

export default New;


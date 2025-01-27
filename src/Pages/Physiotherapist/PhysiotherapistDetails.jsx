import React from "react";
import HospitalAssistCard from "../../components/HospitalAssistCard";
import { useLocation } from "react-router-dom";
import moment from "moment";

export default function PhysiotherapistDetails() {
  const location = useLocation();
  const details = location.state || {};
  console.log({ details });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Physiotherapy Details</h1>
        <div className='flex gap-2'>
        <button className='bg-blue-700 px-4 h-10 text-white font-light'>Confirmed<i className="ri-arrow-down-s-line ml-3 "></i></button>
        <button className='bg-teal-600 px-6 font-light h-10 text-white'>Save</button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 md:items-stretch lg:items-start">
          <div className="listsection bg-white flex-1  p-4 h-auto border">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-semibold">Details</h1>
            
            </div>
            <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
              <h1 className="font-bold">Patient Name:</h1>
              <h1 className="font-light">{details?.patient_name}</h1>

              <input
  className='w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
  type="text"
  placeholder={details?.patient_name || 'Name'}
/>

            </div>

            <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
              <h1 className="font-bold">Preferred time</h1>
              <h1 className="font-light">{details?.prefered_time}</h1>
              <input
  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  type="time"
  placeholder='Select Time'
/>
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Date:</h1>
              <h1 className="font-light">
                {/* {moment(details?.start_date).format("Do MMMM YYYY")} */} </h1>
                <input
  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  type="date"
 

  onChange={(e) => console.log(e.target.value)} // Replace with your handler
/>
             
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Gender:</h1>
              {/* <h1 className="font-light">{details?.patient_gender}</h1> */}
              <select
  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  defaultValue={details?.patient_gender || ''}
>
  <option value="" disabled>
    {details?.patient_gender || 'Select Gender'}
  </option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Therapy Type</h1>
              {/* <h1 className="font-light">{details?.therapy_type}</h1> */}
              <select
  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
  defaultValue={details?.patient_gender || ''}
>
  <option value="" disabled>
    {details?.patient_gender || 'Select Therapy'}
  </option>
  <option value="Orthopedic">Orthopedic</option>
  <option value="Neurological">Neurological</option>
  <option value="Pediatric">Pediatric</option>
  <option value="Geriatric">Geriatric</option>
  <option value="Sports">Sports </option>
  <option value="Women’s Health">Women’s Health</option>
  <option value="Other">Other</option>
</select>
            </div>

            <div>
              <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                Home Address
              </h1>
              <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                {details?.patient_location}
              </div>


              <textarea
  className='w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none'
  placeholder={details?.patient_name || 'Enter details here'}
  rows="4"
/>



              <div class="mt-2 font-semibold text-[0.9125rem]/5 text-teal-800">
                674532
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="bg-white  p-6 h-auto border">
                <h1 className="text-lg font-semibold mb-3">
                  Additional Details
                </h1>

                <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
                  <h1 className="font-bold">Contact Number:</h1>
                  <h1 className="font-light">
                    +91 {details?.patient_contact_no}
                  </h1>
                </div>
                {/* <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                        <h1 className="font-bold">Booking ID:</h1>
                        <h1 className="font-light">#HF65HH8</h1>
                      </div> */}

                <div className="flex items-center justify-between text-[0.9125rem]/5">
                  <h1 className="font-bold">Booking Date:</h1>
                  <h1 className="font-light">
                    {moment(details?.created_date).format("Do MMMM YYYY")}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white flex-1 p-4 md:col-span-2 lg:col-span-1 border h-[32rem] overflow-auto scrollbar-thin scrollbar-track-gray-200">
                                     <h1 className="text-lg font-semibold mb-6">Recommended Therapist</h1>
                       
              
                                         
                                        <HospitalAssistCard/>
                                         <HospitalAssistCard/>
                                         <HospitalAssistCard/>
                                         <HospitalAssistCard/>
                                         <HospitalAssistCard/>
                                         <HospitalAssistCard/>
              
                        
              
              
                                     </div>
        

         
          </div>
        </div>
      </div>
    </div>
  );
}

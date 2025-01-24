import React from 'react'
import HospitalAssistCard from '../../components/HospitalAssistCard'

export default function PhysiotherapistDetails() {
  return (
       <div>
          <div className='flex justify-between items-center'>
         <h1 className='text-2xl font-semibold'>Physiotherapy Details</h1>
         <button className='bg-violet-400 px-4 h-10 text-indigo-900'>Confirmed<i className="ri-arrow-down-s-line ml-3 "></i></button>
         </div>
    
          <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 md:items-stretch lg:items-start">
                 
                    <div className="listsection bg-white flex-1  p-4 h-auto border">
          
                      <div className='flex justify-between items-center mb-6'>
                      <h1 className="text-lg font-semibold">Details</h1>
                      <button className='bg-teal-600 text-stone-50 px-6 text-sm h-8'>Edit</button>
                      </div>
                      <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
                        <h1 className="font-bold">Patient Name:</h1>
                        <h1 className="font-light">Anusree</h1>
                      </div>
          
                      <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
                        <h1 className="font-bold">Preferred time</h1>
                        <h1 className="font-light">2.00 pm</h1>
                      </div>
                  
                      <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                        <h1 className="font-bold">Date:</h1>
                        <h1 className="font-light">2/2/2024</h1>
                      </div>
          
                     
                      <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                        <h1 className="font-bold">Gender:</h1>
                        <h1 className="font-light">Female</h1>
                      </div>

                      <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                        <h1 className="font-bold">Therapy Type</h1>
                        <h1 className="font-light">Lorem ipusum</h1>
                      </div>

          
          
                 
          
                     
          
                
          
                      
                      <div>
                        <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">Home Address</h1>
                        <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                          Door No. 48, 1541, Ponnurunni-Chalikkavattom Rd, Ponnurunni
                          East, Ponnurunni, Vyttila, Kochi, Ernakulam, Kerala
                        </div>
                        <div class="mt-2 font-semibold text-[0.9125rem]/5 text-teal-800">
                          674532
                        </div>
                      </div>
          
                    
                    </div>
          
                    <div >
    
                      <div>
    
                      <div className="bg-white  p-6 h-auto border">
                      <h1 className="text-lg font-semibold mb-3">Additional  Details</h1>
    
                      
          
                      <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
                        <h1 className="font-bold">Contact Number:</h1>
                        <h1 className="font-light">+91 98787878778</h1>
                      </div>
                      <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                        <h1 className="font-bold">Booking ID:</h1>
                        <h1 className="font-light">#HF65HH8</h1>
                      </div>
          
                  
          
                      <div className="flex items-center justify-between text-[0.9125rem]/5">
                        <h1 className="font-bold">Booking Date:</h1>
                        <h1 className="font-light">12/12/2024</h1>
                      </div>
    
                      </div>
                        
    
                   
    
    
    
    
    
    
                      </div>
                    
                    </div>
          
          
                    <div className="">
    
                      <div>
    
                    
                        <div className=' bg-white flex-1  p-4 md:col-span-2  lg:col-span-1 h-auto border'>
                        
    
                        <div className='flex justify-between items-center mb-4'>
                      <h1 className="text-lg font-semibold">Price</h1>
                      <button className='bg-teal-600 text-stone-50 px-6 text-sm h-8'>Save</button>
                      </div>
    
                             <div>
                             
                              <input className='border w-full h-10 px-4' type="text" name="" id="" placeholder='2000' />
                             </div>
    
                           
                          
                        </div>
    
                        <div className=' bg-white flex-1  p-4 md:col-span-2  lg:col-span-1 h-auto border mt-3'>
                        <h1 className="text-lg font-semibold mb-6">Recommended Therapist</h1>
          
                           <HospitalAssistCard/>
                           <HospitalAssistCard/>
                        </div>
    
    
                      </div>
                  
          
                      <div>
          
                      </div>
          
                   
                    </div>
                  </div>
          </div>
        </div>
  )
}

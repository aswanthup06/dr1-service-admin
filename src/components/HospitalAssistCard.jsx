import React from 'react'

export default function HospitalAssistCard() {
  return (
    <div class="mb-2 last:mb-0 pointer-events-auto rounded-lg bg-white p-4 text-[0.8125rem]/5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
    <div class="flex justify-between">

    <div className='w-full flex justify-between items-center mb-3'>
    <div class="font-extrabold text-slate-900">Varun Madhav</div>
    <button className='bg-green-600 text-white py-1 px-3 rounded-full'>Assign</button>
    </div>

    </div>
    <div class="mt-1 text-slate-600">Door No. 48, 1541, Ponnurunni-Chalikkavattom Rd, Ponnurunni East, Ponnurunni, Vyttila, Kochi, Ernakulam, Kerala</div>
    
    <div className='flex gap-4'>
    <div class="mt-2 font-semibold text-teal-800">674532</div>
    <div class="mt-2 font-semibold text-blue-500">Male</div>
    </div>
    </div>
  )
}

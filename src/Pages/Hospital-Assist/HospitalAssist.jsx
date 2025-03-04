import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../config'
import moment from "moment";

export default function HospitalAssist() {
  const[hospAssitant, sethospassitant] = useState([])
  const[loading, setloading] = useState(true)
  const[error, setError] = useState(null)
  console.log("hospAssitant",hospAssitant)
  const navigate = useNavigate()
  useEffect(()=>{
   
    axios.get(`${BASE_URL}/services/gethospitalassistantreqs`).then((response)=>{
      sethospassitant(response.data.data)
      console.log("response-------->",response.data.data)
      setloading(false)
    }).catch((err)=>{
        setError(err.message)
        setloading(false)
    })
  },[])
  
if(loading){
  return <div>Loading..........</div>
}

if(error){
  return <div>Error: {error}</div>
}

  return (
    <div className="overflow-x-auto">
      <h1 className='text-2xl font-semibold mb-4'>Hospital Assistant Bookings</h1>
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 border-b">Patient Name</th>
          <th className="px-4 py-2 border-b">Contact Number</th>
          <th className="px-4 py-2 border-b">Start Date</th>
          <th className="px-4 py-2 border-b">Age</th>
          <th className="px-4 py-2 border-b">Gender</th>
          <th className="px-4 py-2 border-b">Out Patient/In Patient</th>
          <th className="px-4 py-2 border-b">Mobility</th>
          <th className="px-4 py-2 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {hospAssitant.map((patient, index) => (
          <tr key={index} onClick={() => navigate('/hospital-assist/details', { state: patient.id })} 
          className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{patient?.patient_name}</td>
            <td className="px-4 py-2 border-b">{patient?.patient_contact_no}</td>
             <td className="px-4 py-2 border-b">
                            {patient?.start_date
                              ? moment(patient?.start_date, "DD-MM-YYYY").format(
                                  "DD-MM-YYYY"
                                )
                              : ""}
                          </td>
            <td className="px-4 py-2 border-b">{patient?.patient_age}</td>
            <td className="px-4 py-2 border-b">{patient?.patient_gender}</td>
            <td className="px-4 py-2 border-b">{patient?.assist_type}</td>
            <td className="px-4 py-2 border-b">{patient?.patient_mobility}</td>
            <td className="px-4 py-2 border-b">{patient?.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

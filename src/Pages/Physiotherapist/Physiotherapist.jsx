import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Physiotherapist() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log({patients})
  useEffect(() => {
    axios
      .get(`${BASE_URL}/services/getphysiotherapyreqs`)
      .then((response) => {
        setPatients(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const navigate=useNavigate()

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div className="overflow-x-auto">
      <h1 className='text-2xl font-semibold mb-4'>Physiotherapist Bookings</h1>
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 border-b">Patient Name</th>
          <th className="px-4 py-2 border-b">Contact Number</th>
          <th className="px-4 py-2 border-b">Age</th>
          <th className="px-4 py-2 border-b">Gender</th>
          <th className="px-4 py-2 border-b">Date</th>
          <th className="px-4 py-2 border-b">Therapy Type</th>  
          <th className="px-4 py-2 border-b">Preferred time</th>
          <th className="px-4 py-2 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index} onClick={() =>
            navigate("/physiotherapistdetails", { state: patient })
          } className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b">{patient?.patient_name}</td>
            <td className="px-4 py-2 border-b">{patient?.patient_contact_no}</td>
            <td className="px-4 py-2 border-b">{patient?.patient_age}</td>
            <td className="px-4 py-2 border-b">{patient?.patient_gender}</td>
            <td className="px-4 py-2 border-b">{patient?.start_date ? moment(patient?.start_date).format('Do MMMM YYYY') : 'null'}</td>
            <td className="px-4 py-2 border-b">{patient?.therapy_type}</td>
            <td className="px-4 py-2 border-b">{patient?.prefered_time}</td>
            <td className="px-4 py-2 border-b">{patient?.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

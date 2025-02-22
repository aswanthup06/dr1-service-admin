import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function HomeCare() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log({ patients });
  useEffect(() => {
    axios
      .get(`${BASE_URL}/services/gethomeservicereqs`)
      .then((response) => {
        setPatients(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">Home Care Booking</h1>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Patient Name</th>
            <th className="px-4 py-2 border-b">Contact Number</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Age</th>
            <th className="px-4 py-2 border-b">Gender</th>
            <th className="px-4 py-2 border-b">General/Specialized</th>
            <th className="px-4 py-2 border-b">Mobility</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={index}
              onClick={() => navigate("/details", { state: patient.id })}
              className="hover:bg-gray-50"
            >
              <td className="px-4 py-2 border-b">{patient?.patient_name}</td>
              <td className="px-4 py-2 border-b">
                {patient?.patient_contact_no}
              </td>
              <td className="px-4 py-2 border-b">
                {patient?.start_date
                  ? moment(patient?.start_date, "DD-MM-YYYY").format(
                      "DD-MM-YYYY"
                    )
                  : ""}
              </td>
              <td className="px-4 py-2 border-b">{patient?.patient_age}</td>
              <td className="px-4 py-2 border-b">{patient?.patient_gender}</td>
              <td className="px-4 py-2 border-b">
                {patient?.general_specialized}
              </td>
              <td className="px-4 py-2 border-b">
                {patient?.patient_mobility}
              </td>
              <td className="px-4 py-2 border-b">{patient?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

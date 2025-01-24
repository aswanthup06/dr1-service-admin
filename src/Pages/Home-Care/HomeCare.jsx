import React from 'react'

export default function HomeCare() {

  const patients = [
    { name: 'John Doe', contact: '123-456-7890', date:'02/02/2025', age: 30, gender: 'Male', type: 'Out Patient', mobility: 'Walk', status: 'Active' },
    { name: 'Jane Smith', contact: '987-654-3210', date:'02/02/2025', age: 25, gender: 'Female', type: 'In Patient', mobility: 'Wheel Chair', status: 'Inactive' },
    { name: 'Alice Johnson', contact: '555-666-7777', date:'02/02/2025', age: 40, gender: 'Female', type: 'Out Patient', mobility: 'Walk', status: 'Active' },
    { name: 'Bob Williams', contact: '888-999-0000', date:'02/02/2025', age: 50, gender: 'Male', type: 'In Patient', mobility: 'Stretcher', status: 'Discharged' },
    { name: 'Charlie Brown', contact: '444-555-6666', date:'02/02/2025', age: 35, gender: 'Male', type: 'Out Patient', mobility: 'Walk', status: 'Active' },
    { name: 'David Lee', contact: '222-333-4444', date:'02/02/2025', age: 60, gender: 'Male', type: 'In Patient', mobility: 'Wheel Chair', status: 'Inactive' },
    { name: 'Emily Davis', contact: '333-444-5555', date:'02/02/2025', age: 28, gender: 'Female', type: 'Out Patient', mobility: 'Walk', status: 'Active' },
    { name: 'Frank Miller', contact: '666-777-8888', date:'02/02/2025', age: 45, gender: 'Male', type: 'Out Patient', mobility: 'Walk', status: 'Active' },
    { name: 'Grace Wilson', contact: '777-888-9999', date:'02/02/2025', age: 32, gender: 'Female', type: 'In Patient', mobility: 'Stretcher', status: 'Discharged' },
    { name: 'Henry Taylor', contact: '111-222-3333', date:'02/02/2025', age: 38, gender: 'Male', type: 'Out Patient', mobility: 'Wheel Chair', status: 'Active' },
  ];

  return (
    <div className="overflow-x-auto">
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
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{patient.name}</td>
              <td className="px-4 py-2 border-b">{patient.contact}</td>
              <td className="px-4 py-2 border-b">{patient.date}</td>
              <td className="px-4 py-2 border-b">{patient.age}</td>
           
              <td className="px-4 py-2 border-b">{patient.gender}</td>
              <td className="px-4 py-2 border-b">{patient.type}</td>
              <td className="px-4 py-2 border-b">{patient.mobility}</td>
              <td className="px-4 py-2 border-b">{patient.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

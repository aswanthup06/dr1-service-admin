import React, { useState, useEffect } from "react";
import HospitalAssistCard from "../../components/HospitalAssistCard";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../config";
export default function HomeCareDetails() {
  const location = useLocation();
  const details = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [nurses, setNurses] = useState([]);
  console.log({ nurses });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const [price, setPrice] = useState(details?.price || "");

  useEffect(() => {
    if (details?.price !== null) {
      setPrice(details?.price);
    }
  }, [details?.price]);
  const fetchNurses = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/services/allassists`, {
        id: details.id,
      });

      setNurses(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch nurses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurses(); // Call the function to fetch nurses when the component mounts
  }, [details.id]);

  const handleAddPrice = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/services/priceadd`, {
        id: details?.id,
        price: price,
        type: "homecare_service",
      });

      if (response.data.success) {
        alert("Price added successfully!");
      } else {
        alert("Failed to add price.");
      }
    } catch (error) {
      console.error("Error adding price:", error);
      alert("An error occurred while adding the price.");
    }
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value); // Update local price state with new input value
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Home Care Details</h1>
        <div className="flex gap-2">
          <button className="bg-blue-700 px-4 h-10 text-white font-light">
            Confirmed<i className="ri-arrow-down-s-line ml-3 "></i>
          </button>
          <button
            onClick={toggleEdit}
            className="bg-teal-600 px-6 font-light h-10 text-white"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
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
              {/* <h1 className="font-light">{details?.patient_name}</h1> */}
              {isEditing ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  defaultValue={details?.patient_name || "Name"}
                />
              ) : (
                // <span>{details?.patient_name}</span>
                <h1 className="font-light">{details?.patient_name}</h1>
              )}
            </div>
            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Age:</h1>
              {isEditing ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  placeholder={details?.patient_age || "Age"}
                />
              ) : (
                <h1 className="font-light">{details?.patient_age}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Gender:</h1>
              {isEditing ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={details?.patient_gender || ""}
                >
                  <option value="" disabled>
                    {details?.patient_gender || "Select Gender"}
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <h1 className="font-light">{details?.patient_gender}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Mobility</h1>
              {isEditing ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={details?.patient_mobility || ""}
                >
                  <option value="" disabled>
                    {details?.patient_gender || "Select Gender"}
                  </option>
                  <option value="walk">Walk</option>
                  <option value="wheelchair">Wheelchair</option>
                  <option value="stretcher">Stretcher</option>
                </select>
              ) : (
                <h1 className="font-light">{details?.patient_mobility}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Start Date:</h1>
              {isEditing ? (
                <input
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="date"
                  onChange={(e) => console.log(e.target.value)}
                />
              ) : (
                <h1 className="font-light">
                  {moment(details?.start_date).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">End Date:</h1>

              <input
                className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                type="date"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Day / 2X7:</h1>
              {isEditing ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={details?.days_week || ""}
                >
                  <option value="" disabled>
                    {details?.days_week || "Select Gender"}
                  </option>
                  <option value="day">day</option>
                  <option value="night"></option>
                </select>
              ) : (
                <h1 className="font-light">{details?.days_week}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">General/Specialized:</h1>
              {isEditing ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={details?.general_specialized || ""}
                >
                  <option value="" disabled>
                    {details?.general_specialized || "Select "}
                  </option>
                  <option value="general">general</option>
                  <option value="specialized">Specialized</option>
                </select>
              ) : (
                <h1 className="font-light">{details?.general_specialized}</h1>
              )}
            </div>

            <div>
              <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                Home Address
              </h1>
              {isEditing ? (
                <textarea
                  className="w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder={
                    details?.patient_location || "Enter details here"
                  }
                  rows="4"
                />
              ) : (
                <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                  {details?.patient_location}
                </div>
              )}

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
                    {" "}
                    {moment(details?.created_date).format("Do MMMM YYYY")}
                  </h1>
                </div>
              </div>

              <div className="bg-white  p-6 h-auto border mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg font-semibold">
                    Additional Requirements
                  </h1>
                </div>

                {isEditing ? (
                  <textarea
                    className="w-full h-32 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder={details?.requirements || "Enter details here"}
                    rows="4"
                  />
                ) : (
                  <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                    {details?.requirements}
                  </div>
                )}
              </div>

              <div className="bg-white  p-6 h-auto border mt-3">
                <h1 className="text-lg font-semibold mb-3">
                  Additional Attachment
                </h1>

                <div className="flex items-center justify-between">
                  <h1 className="font-light">Report.pdf</h1>
                  <button className="text-sky-600">View</button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h1 className="font-light">Report2.pdf</h1>
                  <button className="text-sky-600">View</button>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div>
              <div className=" bg-white flex-1  p-4 md:col-span-2  lg:col-span-1 h-auto border ">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg font-semibold">Price</h1>
                  {details?.price === null && (
                    <button
                      className="bg-teal-600 text-stone-50 px-6 text-sm h-8"
                      onClick={handleAddPrice}
                    >
                      Add
                    </button>
                  )}
                </div>

                <div>
                  <input
                    className="border w-full h-10 px-4"
                    type="text"
                    name="price"
                    value={details?.price || ""}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>

              <div className="bg-white flex-1 p-4 md:col-span-2 lg:col-span-1 border mt-3 h-[32rem] overflow-auto scrollbar-thin scrollbar-track-gray-200">
                <h1 className="text-lg font-semibold mb-6">
                  Recommended Nurse
                </h1>
                {nurses.length > 0 ? (
                  nurses.map((nurse, index) => (
                    <HospitalAssistCard
                      key={index}
                      assist={nurse}
                      details={details}
                      type="homecare_service"
                    />
                  ))
                ) : (
                  <p>No nurses available.</p>
                )}
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

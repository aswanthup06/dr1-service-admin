import React, { useState, useEffect } from "react";
import HospitalAssistCard from "../../components/HospitalAssistCard";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../config";

export default function PhysiotherapistDetails() {
  const location = useLocation();
  const data_id = location.state || {};
  console.log("datadatadatadatadatadatadatadatadata", data_id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [formData, setDetails] = useState({});
  const currentDate = moment().format("YYYY-MM-DD");
  const [nurses, setNurses] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    id: "",
    patient_name: "",
    patient_mobility: "",
    patient_age: "",
    patient_gender: "",
    patient_location: "",
    start_date: "",
    therapy_type: "",
    prefered_time: "",
    pincode: "",
  });

  console.log({ formData });
  const fetchdetails = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services/getorderdetails`,
        {
          id: data_id,
          type: "physiotherapist_service",
        }
      );

      setFormdata(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch nurses.");
      setLoading(false);
    }
  };
  const fetchNurses = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services/getphysioassists`,
        {
          id: data_id,
        }
      );
      setNurses(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch nurses.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchdetails();
    fetchNurses();
  }, [data_id]);

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    try {
      const responseData = await axios.post(
        `${BASE_URL}/services/updatephysiotherapy`,
        formData
      );

      if (responseData.data.success) {
        alert("service updated");
        setIsEdit(false);
        navigate(0);
      } else {
        alert("failed to update the data");
      }
    } catch (err) {
      console.log("error------>", err);
      alert("error while submitting the message");
    }
  };
  const toggleEdit = () => {
    if (isEdit) {
      console.log("form data saved----", formData);
    }
    setIsEdit(!isEdit);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "start_date") {
      const formattedDate =
        name === "start_date"
          ? moment(value, "YYYY-MM-DD").format("DD-MM-YYYY")
          : value;
      setFormdata((prev) => ({
        ...prev,
        [name]: formattedDate,
      }));
    } else {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour; // Convert 24-hour to 12-hour format
    const formattedMinutes = minutes.padStart(2, "0"); // Ensure minutes have two digits
    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  }
  function convertTo24HourFormat(timeString) {
    if (
      !timeString ||
      typeof timeString !== "string" ||
      !timeString.includes(":")
    ) {
      console.error("Invalid time format");
      return null;
    }
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time?.split(":");

    hours = parseInt(hours, 10);
    if (period === "PM" && hours !== 12) {
      hours += 12; // Convert PM hours to 24-hour format
    } else if (period === "AM" && hours === 12) {
      hours = 0; // Midnight case: 12 AM should be 00 in 24-hour format
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }
  function convertTo12HourFormat(timeString) {
    if (
      !timeString ||
      typeof timeString !== "string" ||
      !timeString.includes(":")
    ) {
      console.error("Invalid time format");
      return null;
    }
    const [hours, minutes] = timeString?.split(":");
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12; // 12 AM (midnight)
    }

    return `${hour}:${minutes} ${ampm}`;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Physiotherapy Details</h1>
        <div className="flex gap-2">
          <button className="bg-blue-700 px-4 h-10 text-white font-light">
            Confirmed<i className="ri-arrow-down-s-line ml-3 "></i>
          </button>
          <button
            onClick={(event) => {
              if (isEdit) {
                handleSubmitChange(event);
              }
              toggleEdit();
            }}
            className="bg-teal-600 px-6 font-light h-10 text-white"
          >
            {isEdit ? "Save" : "Edit"}
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
              {isEdit ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleChange}
                />
              ) : (
                <h1 className="font-light">{formData?.patient_name}</h1>
              )}
            </div>
            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Age:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  value={formData.patient_age}
                  onChange={handleChange}
                  name="patient_age"
                />
              ) : (
                <h1 className="font-light">{formData?.patient_age}</h1>
              )}
            </div>

            <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
              <h1 className="font-bold">Preferred time</h1>

              {isEdit ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="time"
                  name="prefered_time"
                  value={convertTo24HourFormat(formData?.prefered_time)}
                  onChange={handleChange}
                />
              ) : (
                <h1 className="font-light">
                  {/* {convertTo12HourFormat(formData?.prefered_time)}{" "} */}
                  {formData?.prefered_time}
                </h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Date:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="date"
                  name="start_date"
                  value={
                    formData?.start_date
                      ? moment(formData?.start_date, "DD-MM-YYYY").format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  onChange={handleChange}
                  min={currentDate}
                />
              ) : (
                <h1 className="font-light">
                  {formData?.start_date
                    ? moment(formData?.start_date, "DD-MM-YYYY").format(
                        "DD-MM-YYYY"
                      )
                    : ""}
                </h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Gender:</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="patient_gender"
                  onChange={handleChange}
                  value={formData.patient_gender || ""}
                >
                  <option value="" disabled>
                    {formData.patient_gender != null
                      ? formData.patient_gender
                      : "Select Gender"}
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.patient_gender}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Therapy Type</h1>

              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="therapy_type"
                  onChange={handleChange}
                  value={formData?.therapy_type || ""}
                >
                  <option value="" disabled>
                    {formData.therapy_type != null
                      ? formData.therapy_type
                      : "Select Therapy"}
                    {/* {formData?.therapy_type || "Select Therapy"} */}
                  </option>
                  <option value="orthopedic">Orthopedic</option>
                  <option value="neurological">Neurological</option>
                  <option value="pediatric">Pediatric</option>
                  <option value="geriatric">Geriatric</option>
                  <option value="sports">Sports </option>
                  <option value="women’s health">Women’s Health</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.therapy_type}</h1>
              )}
            </div>

            <div>
              <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                Home Address
              </h1>
              {isEdit ? (
                <textarea
                  className="w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  type="text"
                  value={formData.patient_location}
                  onChange={handleChange}
                  name="patient_location"
                  rows="4"
                />
              ) : (
                <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                  {typeof formData?.patient_location === "object" &&
                  formData?.patient_location !== null
                    ? formData?.patient_location?.address
                    : formData?.patient_location}
                </div>
              )}
              <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                <h1 className="font-bold">Pincode:</h1>
                {isEdit ? (
                  <input
                    className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                ) : (
                  <h1 className="font-light">{formData?.pincode}</h1>
                )}
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
                    +91 {formData?.patient_contact_no}
                  </h1>
                </div>

                <div className="flex items-center justify-between text-[0.9125rem]/5">
                  <h1 className="font-bold">Booking Date:</h1>
                  <h1 className="font-light">
                    {moment(formData?.created_date).format("Do MMMM YYYY")}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-white flex-1 p-4 md:col-span-2 lg:col-span-1 border h-[32rem] overflow-auto scrollbar-thin scrollbar-track-gray-200">
              <h1 className="text-lg font-semibold mb-6">
                Recommended Therapist
              </h1>

              {nurses.length > 0 ? (
                nurses.map((nurse, index) => (
                  <HospitalAssistCard
                    key={index}
                    assist={nurse}
                    formData={formData}
                    type="physiotherapist_service"
                  />
                ))
              ) : (
                <p>No nurses available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

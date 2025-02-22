import React, { useState, useEffect } from "react";
import HospitalAssistCard from "../../components/HospitalAssistCard";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddressModal from "../../components/AddressModal";

export default function PhysiotherapistDetails() {
  const location = useLocation();
  const data_id = location.state || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentDate = moment().format("YYYY-MM-DD");
  const [nurses, setNurses] = useState([]);

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormdata] = useState({
    id: data_id,
    patient_name: "",
    patient_mobility: "",
    patient_age: "",
    patient_gender: "",
    patient_location: [
      {
        address: "",
        latitude: "",
        longitude: "",
        pincode: "",
      },
    ],
    start_date: "",
    therapy_type: "",
    prefered_time: "",
    pincode: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChooseAddress = () => {
    setIsModalOpen(true);
  };

  const handleSelectAddress = ({ formattedAddress, postalCode, lat, lng }) => {
    setFormdata({
      ...formData,
      patient_location: [
        {
          address: formattedAddress,
          pincode: postalCode,
          latitude: lat,
          longitude: lng,
        },
      ],
      pincode: postalCode,
    });
  };
  console.log({ formData });
  const fetchdetails = async () => {
    try {
      setLoading(true);
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
    setLoading(true);
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
        toast.success("Service updated successfully!");
        setIsEdit(false);
        // navigate(0);
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
    } else if (name === "patient_location") {
      setFormdata((prevData) => ({
        ...prevData,
        patient_location: [
          {
            ...prevData.patient_location[0],
            address: value,
          },
        ],
      }));
    } else {
      setFormdata((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Physiotherapy Details</h1>
            <div className="flex gap-2">
              <button
                disabled
                className="bg-blue-700 uppercase px-4 h-10 text-white font-light"
              >
                {formData.status ? formData.status : "STATUS"}
                {/* <i className="ri-arrow-down-s-line ml-3 "></i> */}
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
                  <h1 className="font-bold">Therapy Type :</h1>

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

                {/* <div>
                  <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                    Home Address
                  </h1>
                  {isEdit ? (
                    <textarea
                      className="w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      type="text"
                    
                      value={formData?.patient_location?.[0]?.address || ""}
                      onChange={handleChange}
                      name="patient_location"
                      rows="4"
                    />
                  ) : (
                    <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                     
                      {formData?.patient_location?.[0]?.address ||
                        "No Address Provided"}
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
                </div> */}
                <div>
                  <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                    Home Address
                  </h1>
                  {isEdit ? (
                    <div className="flex items-center gap-2">
                      <textarea
                        className="w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        type="text"
                        value={formData?.patient_location?.[0]?.address || ""}
                        onChange={handleChange}
                        name="patient_location"
                        rows="4"
                      />
                      <button
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        onClick={handleChooseAddress}
                      >
                        Choose Address
                      </button>
                    </div>
                  ) : (
                    <div className="text-[0.8125rem]/5 mt-1 text-slate-600">
                      {formData?.patient_location?.[0]?.address ||
                        "No Address Provided"}
                    </div>
                  )}
                  <br />
                  {/* <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
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
                  </div> */}
                  <div class="mt-2 font-semibold text-[0.9125rem]/5 text-teal-800">
                    {formData?.patient_location?.[0]?.pincode}
                  </div>

                  {/* <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    {isEdit ? "Save" : "Edit"}
                  </button> */}

                  {isModalOpen && (
                    <AddressModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onSelectAddress={handleSelectAddress}
                    />
                  )}
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
                  {formData.start_date ? (
                    <>
                      {nurses.length > 0 ? (
                        nurses.map((nurse, index) => (
                          <HospitalAssistCard
                            key={index}
                            assist={nurse}
                            details={formData}
                            type="physiotherapist_service"
                            onAssignSuccess={() => {
                              fetchNurses();
                              fetchdetails();
                            }}
                          />
                        ))
                      ) : (
                        <p>No nurses available.</p>
                      )}
                    </>
                  ) : (
                    <p>Choose Start Date</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

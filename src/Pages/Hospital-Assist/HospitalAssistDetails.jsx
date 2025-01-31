import React, { useEffect, useState } from "react";
import HospitalAssistCard from "../../components/HospitalAssistCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import moment from "moment";

export default function HospitalAssistDetails() {
  const location = useLocation();
  const passedState_id = location.state || {};
  console.log({ passedState_id });
  const [fileToView, setFileToView] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormdata] = useState({
    id: passedState_id,
    patient_name: "",
    patient_mobility: "",
    patient_age: "",
    patient_gender: "",
    hospital_name: "",
    patient_location: "",
    assist_type: "",
    start_date: "",
    time: "",
    days_week: "",
    hospital_location: "",
    pickup_type: "",
    requirements: "",
  });
  console.log({ formData });
  const [price, setPrice] = useState(formData.price || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nurse, setNurses] = useState([]);
  useEffect(() => {
    if (formData?.price !== null) {
      setPrice(formData?.price);
    }
  }, [formData?.price]);

  const handleAddingPrice = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services/priceadd`,
        {
          id: passedState_id,
          price: price,
          type: "hospitalassist_service",
        }
      );
      if (response.data.success) {
        alert("Price added successfully");
      } else {
        alert("error while adding the price");
      }
    } catch (err) {
      console.log("error------->", err);
      alert("an error occured while adding the price");
    }
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    if (isEdit) {
      console.log("form data saved----", formData);
    }
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitChange = async (event) => {
    // alert("hhhhhhh")
    event.preventDefault();
    try {
      const responseData = await axios.post(
        `${BASE_URL}/services/updatehospitalassistservice`,
        formData
      );
      if (responseData.data.success) {
        alert("service updated");
        setIsEdit(false);
      } else {
        alert("failed to update the data");
      }
    } catch (err) {
      console.log("error------>", err);
      alert("error while submitting the message");
    }
  };

  const fetchformData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services/getorderdetails`,
        {
          id: passedState_id,
          type: "hospitalassist_service",
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
      const response = await axios.post(`${BASE_URL}/services/allassists`, {
        id: passedState_id,
      });

      setNurses(response.data.data);
    } catch (err) {
      // setError("Failed to fetch nurses.");
    }
  };

  useEffect(() => {
    fetchformData();
    fetchNurses();
  }, [passedState_id]);

  const handleView = (file) => {
    setFileToView(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFileToView(null);
  };

  // Check if the file is an image
  const isImage = (file) => /\.(jpg|jpeg|png|gif)$/i.test(file);

  // Check if the file is a PDF
  const isPDF = (file) => /\.pdf$/i.test(file);
  console.log({ isPDF });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Hospital Assist Details</h1>
        <div className="flex gap-2">
          <button className="bg-blue-700 uppercase px-4 h-10 text-white font-light">
          {formData.status ? formData.status : "STATUS" }
            {/* <i className="ri-arrow-down-s-line ml-3 "></i> */}
          </button>
          <button
            className="bg-teal-600 px-6 font-light h-10 text-white"
            onClick={(event) => {
              if (isEdit) {
                handleSubmitChange(event);
              }
              toggleEdit();
            }}
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
                  value={formData?.patient_name}
                  onChange={handleChange}
                  name="patient_name"
                />
              ) : (
                <h1 className="font-light">{formData?.patient_name}</h1>
              )}
            </div>

            <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
              <h1 className="font-bold">Age:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  value={formData?.patient_age}
                  onChange={handleChange}
                  name="patient_age"
                />
              ) : (
                <h1 className="font-light">{formData?.patient_age}</h1>
              )}
            </div>

            <div className="flex items-center text-[0.9125rem]/5 justify-between mb-4">
              <h1 className="font-bold">In Patient/Out Patient:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  value={formData?.assist_type}
                  onChange={handleChange}
                  name="assist_type"
                />
              ) : (
                <h1 className="font-light">{formData?.assist_type}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Days:</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="days_week"
                  value={formData?.days_week}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {formData?.days_week || "Days"}
                  </option>
                  <option value="day">day</option>
                  <option value="night">night</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.days_week}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Start Date:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                  value={formData.start_date}
                />
              ) : (
                <h1 className="font-light">{formData?.start_date}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">End Date:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="date"
                  // onChange={(e) => console.log(e.target.value)}
                />
              ) : (
                <h1 className="font-light">{formData?.start_date}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Gender:</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="gender"
                  onChange={handleChange}
                  value={formData?.gender}
                >
                  <option value="" disabled>
                    {formData?.patient_gender || "Select Gender"}
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
              <h1 className="font-bold">Mobility</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="patient_mobility"
                  onChange={handleChange}
                  value={formData?.patient_mobility}
                >
                  <option value="" disabled>
                    {formData?.patient_mobility || "Select Mobility"}
                  </option>
                  <option value="walk">Walk</option>
                  <option value="wheelchair">Wheelchair</option>
                  <option value="stretcher">Stretcher</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.patient_mobility}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Pick Up:</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="pickup_type"
                  value={formData?.pickup_type}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    {formData?.pickup_type || "Pick Up"}
                  </option>
                  <option value="door">door to door</option>
                  <option value="hospital">Hospital only</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.pickup_type}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Hospital Name:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 text-right px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="hospital_name"
                  value={formData?.hospital_name}
                  onChange={handleChange}
                />
              ) : (
                <h1 className="font-light">{formData?.hospital_name}</h1>
              )}
            </div>

            <div>
              <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                Hospital Address
              </h1>
              {isEdit ? (
                <textarea
                  className="w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  name="hospital_location"
                  value={
                    typeof formData?.hospital_location === "object" &&
                    formData?.hospital_location !== null
                      ? formData?.hospital_location?.address
                      : formData?.hospital_location
                  }
                  onChange={handleChange}
                  rows="4"
                />
              ) : (
                <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                  {typeof formData?.hospital_location === "object" &&
                  formData?.hospital_location !== null
                    ? formData?.hospital_location?.address
                    : formData?.hospital_location}
                </div>
              )}

              <div class="mt-2 font-semibold text-[0.9125rem]/5 text-teal-800">
                674532
              </div>
            </div>

            <div>
              <h1 className="mb-2 text-[0.9125rem]/5 font-bold mt-4">
                Home Address
              </h1>
              {isEdit ? (
                <textarea
                  className="w-full h-24 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  name="patient_location"
                  value={
                    typeof formData?.patient_location === "object" &&
                    formData?.patient_location !== null
                      ? formData?.patient_location?.address
                      : formData?.patient_location
                  }
                  onChange={handleChange}
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
                  <h1 className="font-light">{formData?.patient_contact_no}</h1>
                </div>
                {/* <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
                  <h1 className="font-bold">Booking ID:</h1>
                  <h1 className="font-light">#HF65HH8</h1>
                </div> */}

                <div className="flex items-center justify-between text-[0.9125rem]/5">
                  <h1 className="font-bold">Booking Date:</h1>
                  <h1 className="font-light">
                    {" "}
                    {moment(formData?.created_date).format("Do MMMM YYYY")}
                  </h1>
                </div>
              </div>

              <div className="bg-white  p-6 h-auto border mt-3">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-lg font-semibold">
                    Additional Requerment
                  </h1>
                </div>

                {/* <div class="text-[0.8125rem]/5 mt-1 text-slate-600"> */}
                {isEdit ? (
                  <textarea
                    className="w-full h-32 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder={formData?.requirements || "Enter details here"}
                    rows="4"
                  />
                ) : (
                  <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                    {formData?.requirements}
                  </div>
                )}
                {/* </div> */}
              </div>

              <div className="bg-white  p-6 h-auto border mt-3">
                <h1 className="text-lg font-semibold mb-3">
                  Additional Attachment
                </h1>
                {Object.entries(formData?.medical_documents || {}).map(
                  ([key, url], index) => (
                    <div
                      className="flex items-center justify-between mt-4"
                      key={index}
                    >
                      <h1 className="font-light">{key}</h1>{" "}
                      <button
                        className="text-sky-600"
                        onClick={() => handleView({ name: key, url })}
                      >
                        View
                      </button>
                    </div>
                  )
                )}

                {isModalOpen && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-3xl">
                      <button className="text-red-600" onClick={closeModal}>
                        Close
                      </button>
                      <div className="mt-4">
                        {isImage(fileToView?.url) ? (
                          <img
                            src={fileToView?.url}
                            alt={fileToView?.name}
                            className="max-w-full max-h-96"
                          />
                        ) : isPDF(fileToView?.url) ? (
                          <iframe
                            src={`https://docs.google.com/gview?url=${fileToView?.url}&embedded=true`}
                            width="100%"
                            height="500px"
                            style={{ border: "none" }}
                          />
                        ) : (
                          <p>Unsupported file type</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <div>
              <div className=" bg-white flex-1  p-4 md:col-span-2  lg:col-span-1 h-auto border">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-lg font-semibold">Vehicle Details</h1>
                </div>

                <div>
                  <h1 className="font-bold">Vehicle Type</h1>

                  <select className="border w-full h-10 px-4 mt-2">
                    <option value="" disabled>
                      {formData?.pickup_type || "Vehicle type"}
                    </option>
                    <option value="ambulance">Ambulance</option>
                    <option value="car">car</option>
                  </select>
                </div>

                <div className="mt-4">
                  <h1 className="font-bold">Vehicle Number</h1>
                  <input
                    className="border w-full h-10 px-4 mt-2"
                    type="text"
                    name=""
                    id=""
                    placeholder="KL18HY89"
                  />
                </div>
              </div>

              <div className=" bg-white flex-1  p-4 md:col-span-2  lg:col-span-1 h-auto border mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg font-semibold">Price</h1>
                  {formData?.price === null && (
                    <button
                      className="bg-teal-600 text-stone-50 px-6 text-sm h-8"
                      onClick={handleAddingPrice}
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
                    value={formData?.price || ""}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>

              <div className="bg-white flex-1 p-4 md:col-span-2 lg:col-span-1 border mt-3 h-[32rem] overflow-auto scrollbar-thin scrollbar-track-gray-200">
                <h1 className="text-lg font-semibold mb-6">
                  Recommended Assistant
                </h1>
                {nurse.length > 0 ? (
                  nurse.map((nurse, index) => (
                    <HospitalAssistCard
                      key={index}
                      assist={nurse}
                      details={passedState_id}
                      type="homecare_service"
                      onAssignSuccess={fetchNurses}
                    />
                  ))
                ) : (
                  <p>No Assistant available.</p>
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

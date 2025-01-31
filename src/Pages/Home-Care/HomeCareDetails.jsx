import React, { useState, useEffect } from "react";
import HospitalAssistCard from "../../components/HospitalAssistCard";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../config";

export default function HomeCareformData() {
  const location = useLocation();
  const data_id = location.state || {};
  const currentDate = moment().format("YYYY-MM-DD");
  const [fileToView, setFileToView] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [nurses, setNurses] = useState([]);
  console.log({ nurses });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormdata] = useState({
    id: data_id,
    patient_name: "",
    patient_mobility: "",
    patient_age: "",
    patient_gender: "",
    patient_location: "",
    start_date: "",
    end_date: "",
    time: "",
    days_week: "",
    requirements: "",
  });
  console.log({ formData });
  const [price, setPrice] = useState(formData?.price || "");
  const navigate = useNavigate();
  useEffect(() => {
    if (formData?.price !== null) {
      setPrice(formData?.price);
    }
  }, [formData?.price]);
  // useEffect(() => {
  //   pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
  // }, []);
  const fetchformData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/services/getorderdetails`,
        {
          id: data_id,
          type: "homecare_service",
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
        id: data_id,
      });
      setNurses(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch nurses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchformData();
    fetchNurses();
  }, [data_id]);

  const handleAddPrice = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/services/priceadd`, {
        id: formData?.id,
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
    const { value } = event.target;
    const numericValue = value === "" ? "" : parseFloat(value);
    setPrice(numericValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "start_date" || name === "end_date") {
      const formattedDate =
        name === "start_date" || name === "end_date"
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

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    try {
      const responseData = await axios.post(
        `${BASE_URL}/services/updatehomeservice`,
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
      alert("error while submitting the message");
    }
  };

  const toggleEdit = () => {
    if (isEdit) {
      console.log("form data saved----", formData);
    }
    setIsEdit(!isEdit);
  };

  /////////////////image handling///////
  const handleView = (file) => {
    setFileToView(file);
    setIsModalOpen(true);
    // setPdfError(false);
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
        <h1 className="text-2xl font-semibold">Home Care Details</h1>
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
                  value={formData.patient_mobility || ""}
                >
                  <option value="" disabled></option>
                  <option value="walk">Walk</option>
                  <option value="wheelchair">Wheelchair</option>
                  <option value="stretcher">Stretcher</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.patient_mobility}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Start Date:</h1>
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
              <h1 className="font-bold">End Date:</h1>
              {isEdit ? (
                <input
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  type="date"
                  name="end_date"
                  value={
                    formData?.end_date
                      ? moment(formData?.end_date, "DD-MM-YYYY").format(
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  onChange={handleChange}
                  min={currentDate}
                />
              ) : (
                <h1 className="font-light">
                  {formData?.end_date
                    ? moment(formData?.end_date, "DD-MM-YYYY").format(
                        "DD-MM-YYYY"
                      )
                    : ""}
                </h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">Day / 2X7:</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="days_week"
                  onChange={handleChange}
                  value={formData.days_week || ""}
                >
                  <option value="" disabled>
                    {formData?.days_week || "Select "}
                  </option>
                  <option value="day">day</option>
                  <option value="24*7">24*7</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.days_week}</h1>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 text-[0.9125rem]/5">
              <h1 className="font-bold">General/Specialized:</h1>
              {isEdit ? (
                <select
                  className="w-5/12 h-8 px-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  name="general_specialized"
                  onChange={handleChange}
                  value={formData.general_specialized || ""}
                >
                  <option value="" disabled>
                    {formData?.general_specialized || "Select "}
                  </option>
                  <option value="general">general</option>
                  <option value="specialized">specialized</option>
                </select>
              ) : (
                <h1 className="font-light">{formData?.general_specialized}</h1>
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
                  value={
                    typeof formData?.patient_location === "object" &&
                    formData?.patient_location !== null
                      ? formData?.patient_location?.address
                      : formData?.patient_location
                  }
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
                  Additional formData
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
                    {" "}
                    {moment(formData?.created_date).format("Do MMMM YYYY")}
                  </h1>
                </div>
              </div>

              <div className="bg-white  p-6 h-auto border mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg font-semibold">
                    Additional Requirements
                  </h1>
                </div>

                {isEdit ? (
                  <textarea
                    className="w-full h-32 p-2 bg-slate-100 border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    // placeholder={formData?.requirements || "Enter formData here"}
                    type="text"
                    value={formData.requirements}
                    onChange={handleChange}
                    name="requirements"
                    rows="4"
                  />
                ) : (
                  <div class="text-[0.8125rem]/5 mt-1 text-slate-600">
                    {formData?.requirements}
                  </div>
                )}
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
                      {/* Use the key as the file name */}
                      <button
                        className="text-sky-600"
                        onClick={() => handleView({ name: key, url })}
                      >
                        View
                      </button>
                    </div>
                  )
                )}

                {/* modallllllllll */}
              </div>

              {/* Modal to view the attachment */}
              {/* {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-4 rounded-lg">
                    <button className="text-red-600" onClick={closeModal}>
                      Close
                    </button>
                    <div className="mt-4">
                      {isImage(fileToView.url) ? (
                        <img
                          src={fileToView.url}
                          alt={fileToView.name}
                          className="max-w-full max-h-96"
                        />
                      ) : isPDF(fileToView.url) ? (
                        <iframe
                          src={fileToView.url}
                          width="100%"
                          height="500px"
                          title="PDF Viewer"
                        />
                      ) : (
                        <p>Unsupported file type</p>
                      )}
                    </div>
                  </div>
                </div>
              )} */}
              {/* {isModalOpen && (
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
                        <>
                          <Document
                            file={fileToView?.url}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                          >
                            <Page pageNumber={pageNumber} />
                          </Document>
                          <p>
                            Page {pageNumber} of {numPages}
                          </p>
                          <button
                            onClick={() =>
                              setPageNumber((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={pageNumber <= 1}
                          >
                            Previous
                          </button>
                          <button
                            onClick={() =>
                              setPageNumber((prev) =>
                                Math.min(prev + 1, numPages)
                              )
                            }
                            disabled={pageNumber >= numPages}
                          >
                            Next
                          </button>
                        </>
                      ) : (
                        <p>Unsupported file type</p>
                      )}
                    </div>
                  </div>
                </div>
              )} */}
{isModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    {/* Modal Container */}
    <div className="bg-white p-4 max-h-[80%] overflow-auto w-[40%] relative">
      
      {/* Close Button - Positioned Absolutely to Stay Fixed */}
      <button 
        className="absolute bottom-10 right-10 text-white h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center"
        onClick={closeModal}
      >
        <i className="ri-close-large-line"></i>
      </button>

      {/* File Preview */}
      <div className="overflow-auto">
        {isImage(fileToView?.url) ? (
          <img
            src={fileToView?.url}
            alt={fileToView?.name}
            className="w-full max-h-[600px] object-contain"
          />
        ) : isPDF(fileToView?.url) ? (
          <iframe
            src={`https://docs.google.com/gview?url=${fileToView?.url}&embedded=true`}
            width="100%"
            height="700px"
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

          <div className="">
            <div>
              <div className=" bg-white flex-1  p-4 md:col-span-2  lg:col-span-1 h-auto border ">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg font-semibold">Price</h1>
                  {formData?.price === null && (
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
                    type="number"
                    name="price"
                    value={price}
                    onChange={handlePriceChange}
                    disabled={formData?.price !== null}
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
                      formData={formData}
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

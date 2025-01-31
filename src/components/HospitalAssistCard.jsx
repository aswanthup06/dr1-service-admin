import axios from "axios";
import React from "react";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function HospitalAssistCard({
  assist,
  details,
  type,
  onAssignSuccess,
}) {
  console.log({ type });
  const handleAssignClick = async () => {
    if (assist?.button_status === "assign") {
      try {
        const data = {
          assist_id: assist?.id,
          id: details?.id,
          type: type,
        };
        console.log({ data });
        const response = await axios.post(
          `${BASE_URL}/services/assignassist`,
          data
        );

        if (response.data.success) {
          toast.success("assist assigned successfully!");
          onAssignSuccess();
        } else {
          toast.error("Failed to assign assist.!");
        }
      } catch (error) {
        console.error("Error assigning assist:", error);
        alert("An error occurred while assigning the assist.");
      }
    }
  };
  return (
    <div class="mb-2 last:mb-0 pointer-events-auto rounded-lg bg-white p-4 text-[0.8125rem]/5 shadow-xl shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
      <ToastContainer />
      <div class="flex justify-between">
        <div className="w-full flex justify-between items-center mb-3">
          <div class="font-extrabold text-slate-900">
            {assist?.name}
            <h1 className="text-xs font-light">{assist?.phone_no}</h1>
          </div>
          <button
            className="bg-green-600 text-white py-1 px-3 rounded-full"
            onClick={handleAssignClick}
            disabled={assist?.button_status !== "assign"}
          >
            {assist?.button_status}
          </button>
        </div>
      </div>
      <div class="mt-1 text-slate-600">{assist?.address}</div>

      <div className="flex gap-4">
        <div class="mt-2 font-semibold text-teal-800">{assist?.pincode}</div>
        <div class="mt-2 font-semibold text-blue-500">{assist?.gender}</div>
      </div>
    </div>
  );
}

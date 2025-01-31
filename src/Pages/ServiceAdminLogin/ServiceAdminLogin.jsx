import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

export default function ServiceAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    const user = username.trim().toLowerCase();
    const pass = password.trim().toLowerCase();

    if (user === "adm_physio" && pass === "physiotherapy") {
      navigate("/physiotherapist");
    } else if (user === "adm_hospitalassist" && pass === "hospitalassistant") {
      navigate("/hospital-assist");
    } else if (user === "adm_homecare" && pass === "homecare") {
      navigate("/homecare");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="w-full h-[calc(100dvh-50px)] flex flex-col items-center justify-center">
      <img
        className="w-14 h-14 object-cover rounded-full"
        src="https://images.unsplash.com/photo-1737366984875-fb81751f6655?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <h1 className="text-2xl font-bold mt-4">Welcome to Dr1 </h1>
      <h1 className="text-2xl font-bold">Service Admin Section</h1>

      <div className="relative h-12 w-80 mt-8">
        <input
          className="h-full pl-10 font-extralight bg-slate-100 w-full border border-gray-300 focus:border-indigo-600 focus:outline-none "
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <i className="ri-user-6-line absolute left-3 top-1/2 -translate-y-1/2"></i>
      </div>

      <div className="relative h-12 w-80 mt-3">
        <input
          className="h-full pl-10 font-extralight bg-slate-100 w-full border border-gray-300 focus:border-indigo-600 focus:outline-none "
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i className="ri-lock-password-line absolute left-3 top-1/2 -translate-y-1/2"></i>
      </div>

      <label className="flex items-center mt-4 w-80">
        <input
          type="checkbox"
          onChange={() => setShowPassword(!showPassword)}
          className=""
        />
        <span className="ml-2 text-sm text-slate-500">Show Password</span>
      </label>

      <button
        onClick={handleLogin}
        className="h-12 bg-indigo-600 w-80 text-white font-thin text-sm mt-6"
      >
        Login
      </button>
    </div>
  );
}

import "./App.css";
import "./index.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeCare from "./Pages/Home-Care/HomeCare";
import HomeCareDetails from "./Pages/Home-Care/HomeCareDetails";
import HospitalAssist from "./Pages/Hospital-Assist/HospitalAssist";
import HospitalAssistDetails from "./Pages/Hospital-Assist/HospitalAssistDetails";
import Physiotherapist from "./Pages/Physiotherapist/Physiotherapist";
import PhysiotherapistDetails from "./Pages/Physiotherapist/PhysiotherapistDetails";
import "remixicon/fonts/remixicon.css";
import ServiceAdminLogin from "./Pages/ServiceAdminLogin/ServiceAdminLogin";
import "remixicon/fonts/remixicon.css";
import RequireAuth from "./Pages/ServiceAdminLogin/RequireAuth";

function App() {
  const location = useLocation();
  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.userType : null;
  };
  const ProtectedRoute = ({ element, allowedRole }) => {
    const userType = isAuthenticated();
    if (!userType) {
      return <Navigate to="/unauthorized" replace />;
    }
    if (userType !== allowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
    return element;
  };
  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <div className="p-4">
        {" "}
        <Routes>
          {/* Home-Care */}
          <Route
            path="/homecare"
            element={
              <ProtectedRoute element={<HomeCare />} allowedRole="homecare" />
            }
          />
          <Route
            path="/details"
            element={
              <ProtectedRoute
                element={<HomeCareDetails />}
                allowedRole="homecare"
              />
            }
          />
          {/* Hospital-Assist */}
          <Route
            path="/hospital-assist"
            element={
              <ProtectedRoute
                element={<HospitalAssist />}
                allowedRole="hospitalassist"
              />
            }
          />
          <Route
            path="/hospital-assist/details"
            element={
              <ProtectedRoute
                element={<HospitalAssistDetails />}
                allowedRole="hospitalassist"
              />
            }
          />

          {/* Physiotherapist */}
          <Route
            path="/physiotherapist"
            element={
              <ProtectedRoute
                element={<Physiotherapist />}
                allowedRole="physiotherapist"
              />
            }
          />
          <Route
            path="/physiotherapistdetails"
            element={
              <ProtectedRoute
                element={<PhysiotherapistDetails />}
                allowedRole="physiotherapist"
              />
            }
          />
    
          <Route
            path="/unauthorized"
            element={<div>Unauthorized Access</div>}
          />
          {/* Default route or 404 */}
          <Route path="*" element={<div>Page Not Found</div>} />
          {/* ServiceAdminLogin route */}
          <Route path="/" element={<ServiceAdminLogin />} />
        </Routes>
      </div>
    </>
  );
}


export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}



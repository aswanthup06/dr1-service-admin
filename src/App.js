import './App.css';
import './index.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeCare from './Pages/Home-Care/HomeCare';
import HomeCareDetails from './Pages/Home-Care/HomeCareDetails';
import HospitalAssist from './Pages/Hospital-Assist/HospitalAssist';
import HospitalAssistDetails from './Pages/Hospital-Assist/HospitalAssistDetails';
import Physiotherapist from './Pages/Physiotherapist/Physiotherapist';
import PhysiotherapistDetails from './Pages/Physiotherapist/PhysiotherapistDetails';
import 'remixicon/fonts/remixicon.css'
import ServiceAdminLogin from './Pages/ServiceAdminLogin/ServiceAdminLogin';
import 'remixicon/fonts/remixicon.css'

function App() {
  const location = useLocation()
  return (
    <>
      {/* Conditionally render Navbar only if not on the /service-login route */}
      {location.pathname !== "/" && <Navbar />}

      <div className="p-4"> {/* Add padding to content */}
        <Routes>
          {/* Home-Care */}
          <Route path="/homecare" element={<HomeCare />} />
          <Route path="/details" element={<HomeCareDetails />} />

          {/* Hospital-Assist */}
          <Route path="/hospital-assist" element={<HospitalAssist />} />
          <Route path="/hospital-assist/details" element={<HospitalAssistDetails />} />

          {/* Physiotherapist */}
          <Route path="/physiotherapist" element={<Physiotherapist />} />
          <Route path="/physiotherapistdetails" element={<PhysiotherapistDetails />} />

          {/* Default route or 404 */}
          <Route path="*" element={<div>Page Not Found</div>} />
          {/* ServiceAdminLogin route */}
          <Route path="/" element={<ServiceAdminLogin />} />
        </Routes>
      </div>
    </>
  );
}

// Wrap the App component with Router
export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}


// export default App;

import './App.css';
import './index.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeCare from './Pages/Home-Care/HomeCare';
import HomeCareDetails from './Pages/Home-Care/HomeCareDetails';
import HospitalAssist from './Pages/Hospital-Assist/HospitalAssist';
import HospitalAssistDetails from './Pages/Hospital-Assist/HospitalAssistDetails';
import Physiotherapist from './Pages/Physiotherapist/Physiotherapist';
import PhysiotherapistDetails from './Pages/Physiotherapist/PhysiotherapistDetails';
import 'remixicon/fonts/remixicon.css'

function App() {
  return (
    <Router>
      <Navbar /> {/* Include Navbar */}
      <div className="p-4"> {/* Add padding to content */}
        <Routes>
          {/* Home-Care */}
          <Route path="/" element={<HomeCare />} />
          <Route path="/details" element={<HomeCareDetails />} />

          {/* Hospital-Assist */}
          <Route path="/hospital-assist" element={<HospitalAssist />} />
          <Route path="/hospital-assist/details" element={<HospitalAssistDetails />} />

          {/* Physiotherapist */}
          <Route path="/physiotherapist" element={<Physiotherapist />} />
          <Route path="/physiotherapist/details" element={<PhysiotherapistDetails />} />

          {/* Default route or 404 */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

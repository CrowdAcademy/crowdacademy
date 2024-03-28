import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage/landingPage';
import AuthPage from './pages/authPage/authPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;

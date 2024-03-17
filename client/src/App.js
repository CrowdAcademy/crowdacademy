import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import AuthPage from './pages/authPage/authPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<LandingPage/>} />
        <Route path = "/auth" element = {<AuthPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

/* https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom */
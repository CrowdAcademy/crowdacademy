import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import AuthPage from './pages/authPage/authPage';
import StudentPage from './pages/student/student';
import InstructorHomePage from './pages/instructor/homePage';
import AccountPage from './pages/account';
import ProtectedRoute from './components/ProtectedRoute';
import QuestionResponsePage from './pages/instructor/QAPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/instructor/home" element={<InstructorHomePage />} />
        <Route path="/respond/:slug" element={<QuestionResponsePage />} /> {/* Dynamic route with slug parameter */}
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

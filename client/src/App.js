import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import AuthPage from './pages/authPage/authPage';
import StudentPage from './pages/student/student';
import AccountPage from './pages/account'
import ProtectedRoute from './components/ProtectedRoute'
import InstructorHomePage from './pages/instructor/homePage';
import InstructorInboxPage from './pages/instructor/inBoxPage';
import QuestionResponsePage from './pages/instructor/QAPage';
import LessonPage from './pages/lesson/lesson';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/instructor/home" element={<InstructorHomePage />} />
        <Route path="/instructor/inbox" element={<InstructorInboxPage />} />
        <Route path="/respond/:slug" element={<QuestionResponsePage />} />
        <Route path="/lesson/:slug" element={<LessonPage />} />
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

/* https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom */
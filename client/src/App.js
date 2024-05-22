import React from 'react';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import AuthPage from './pages/authPage/authPage';
import StudentPage from './pages/student/student';
import AccountPage from './pages/account';
import ProtectedRoute from './components/ProtectedRoute';
import InstructorHomePage from './pages/instructor/homePage';
import InstructorInboxPage from './pages/instructor/inBoxPage';
import QuestionResponsePage from './pages/instructor/QAPage';
import LessonPage from './pages/lesson/lesson';
import AnswersPage from './pages/answers/AnswersPage';
import QuestionsPage from './pages/questions/QuestionsPage';
import LogoutPage from './pages/logout/LogoutPage';



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/answers" element={<AnswersPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/instructor/home" element={<InstructorHomePage />} />
      <Route path="/instructor/inbox" element={<InstructorInboxPage />} />
      <Route path="/respond/:slug" element={<QuestionResponsePage />} />
      <Route path="/lesson/:slug" element={<LessonPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/account" element={
        <ProtectedRoute>
          <AccountPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;


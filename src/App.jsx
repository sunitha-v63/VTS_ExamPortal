import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Overview from './Pages/Overview';
import Designing from './Pages/Designing';
import OfflineTrainees from './Pages/OfflineTrainees';
import OnlineTrainees from './Pages/OnlineTrainees';
import Exam from './Pages/Exam';
import Result from './Pages/Result';
import Question1 from './Pages/Question1';
import Question2 from './Pages/Question2';
import Thanks from './Pages/Thanks';
import UploadQuestionPaper from './Pages/UploadQuestionPaper';
import TraineeProfile from './Pages/TraineeProfile';
import logo from './assets/Images/logo.png';
import LoginForm from './Pages/LoginForm';
import ProtectedRoute from './Components/ProtectedRoute';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isLoginPage = location.pathname === '/';

  return (
    <>
      {!isLoginPage && isLoggedIn && (
        <nav className="navbar navbar-light bg-light d-flex d-md-none justify-content-between px-3">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Exam Portal" className="mobile-logo me-2" style={{ width: '50px' }} />
            <span className="mobile-title fw-bold fs-5">VTS Exam Portal</span>
          </div>
          <button className="navbar-toggler" onClick={() => setSidebarOpen(true)}>
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
      )}
      <div className="parent-container">
        {!isLoginPage && isLoggedIn && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
            <Route path="/designing" element={<ProtectedRoute><Designing /></ProtectedRoute>} />
            <Route path="/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
            <Route path="/offlinetrainees" element={<ProtectedRoute><OfflineTrainees /></ProtectedRoute>} />
            <Route path="/onlinetrainees" element={<ProtectedRoute><OnlineTrainees /></ProtectedRoute>} />
            <Route path="/traineeprofile" element={<ProtectedRoute><TraineeProfile /></ProtectedRoute>} />
            <Route path="/question1" element={<ProtectedRoute><Question1 /></ProtectedRoute>} />
            <Route path="/question2" element={<ProtectedRoute><Question2 /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/thanks" element={<ProtectedRoute><Thanks /></ProtectedRoute>} />
            <Route path="/uploadpaper" element={<ProtectedRoute><UploadQuestionPaper /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

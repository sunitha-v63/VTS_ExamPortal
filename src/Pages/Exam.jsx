import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultUserImage from '../assets/Images/Img1.png';

const Exam = ({ radiumGreen = '#d7f96a' }) => {
  const navigate = useNavigate();  
  const location = useLocation();

  const src = location.state || {};
  const userName =
    src.name ||
    localStorage.getItem('currentUserName') ||
    'User';
  const userImage =
    src.image ||
    localStorage.getItem('currentUserImage') ||
    defaultUserImage;

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container mt-4">
      <div className="bg-white shadow-sm py-3 px-4 rounded d-flex align-items-center mb-4">
        <img
          src={userImage}
          alt={userName}
          className="rounded-circle me-3"
          width="50"
          height="50"
        />
        <div>
          <h2>Welcome, {userName}</h2>
          <small className="text-muted">It's {currentDate}</small>
        </div>
      </div>
      <h5 className="mb-3 mt-5 fs-3">Upcoming Exams</h5>
      <div className="card p-3 w-100" style={{ backgroundColor: radiumGreen }}>
        <div className="mb-4">
          <div className="d-flex fs-4 p-2 justify-content-between align-items-center mb-2">
            <strong>Technical Questions</strong>
            <button
              className="btn btn-dark btn-sm"
              onClick={() => {
                localStorage.setItem('currentTraineeName', userName);
                navigate('/Question1');
              }}
            >
              Start Exam
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center border border-primary p-2 rounded bg-transparent">
            <div className="fs-5">
              <strong>Figma Technical Questions</strong><br />
              <small className="text-muted">Duration: 30 Minutes</small>
            </div>
            <div className="text-end">
              <small className="fw-bold">July 15, 2025</small><br />
              <small className="text-muted">2:30 PM</small>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2 fs-4">
            <strong>Practical Questions</strong>
            <button
              className="btn btn-dark btn-sm"
              onClick={() => {
                localStorage.setItem('currentTraineeName', userName);
                navigate('/Question1');
              }}
            >
              Start Exam
            </button>
          </div>
          <div className="d-flex justify-content-between align-items-center border border-primary p-2 rounded bg-transparent">
            <div className="fs-5">
              <strong>Figma Practical Questions</strong><br />
              <small className="text-muted">Duration: 1 Day</small>
            </div>
            <div className="text-end">
              <small className="fw-bold">July 16, 2025</small><br />
              <small className="text-muted">4:00 PM</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;

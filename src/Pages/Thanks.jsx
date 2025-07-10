import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import successImg from '../assets/images/Submitted img.png';

const Thanks = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex vh-100">
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4">
        <img
          src={successImg}
          alt="Success"
          className="mb-4 img-fluid"
          style={{ maxWidth: '80%', height: 'auto', maxHeight: '300px' }}
        />

        <h4
          className="fw-semibold fs-3 mb-5"
          style={{ maxWidth: '90%', lineHeight: '1.4' }}
        >
          Thank You — your response has been submitted
        </h4>

        <button
          className="btn fw-bold px-5 fs-3"
          style={{ backgroundColor: '#d6ff63' }}
          onClick={() => navigate('/result')}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Thanks;

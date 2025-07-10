import React from 'react';
import { FaEnvelope, FaPhone, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TraineeCard = ({ id, name, duration, course, mode, email, phone, image }) => {
  const navigate = useNavigate();

  return (
    <div className="card p-3 mt-2" style={{ backgroundColor: '#e6ffb3', width: '300px', position: 'relative' }}>
      <FaPen className="position-absolute top-0 end-0 m-2" style={{ cursor: 'pointer' }} />
      
      <div className="d-flex align-items-center mb-3">
        <img src={image} alt={name} className="rounded-circle me-3" width="60" height="60" />
        <h5 className="m-0">{name}</h5>
      </div>

      <p><strong>Durations :</strong> {duration}</p>
      <p><strong>Course Name :</strong> {course}</p>
      <p><strong>Class Mode :</strong> {mode}</p>
      <p><FaEnvelope /> {email}</p>
      <p><FaPhone /> {phone}</p>

      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-dark btn-sm"
          onClick={() => navigate('/traineeprofile', { state: { name, course, image } })}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default TraineeCard;
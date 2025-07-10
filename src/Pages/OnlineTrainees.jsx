import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TraineeCard from '../Components/TraineeCard.jsx';
import { onlineTrainees } from '../data/OnlineTrainee.jsx';

const OnlineTrainees = () => {
  return (
    <div className="d-flex">
      <div className="container-fluid">
        <h5 className="mt-3">
          <Link to="/trainers" className="text-decoration-none text-black mx-1">
            Trainer Name
          </Link>
          &gt;
          <Link to="/online-trainees" className="text-decoration-none text-primary mx-1">
            Online Trainees
          </Link>
          &gt;
          <Link to="/offline-trainees" className="text-decoration-none mx-1 text-black">
            Offline Trainees
          </Link>
        </h5>

        <div className="container mt-4">
          <div className="row gx-2 gy-3">
            {onlineTrainees.map((trainee) => (
              <div
                className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
                key={trainee.id}
              >
                <TraineeCard {...trainee} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineTrainees;
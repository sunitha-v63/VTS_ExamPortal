import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TraineeProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const name = state?.name || 'N/A';
  const image = state?.image || 'https://via.placeholder.com/100';
  const course = state?.course || 'N/A';

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const radiumGreen = '#d7f96a';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const getCalendarDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days = [];
    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCount > totalDays) {
          row.push('');
        } else {
          row.push(dayCount++);
        }
      }
      days.push(row);
    }
    return days;
  };

  const calendarDays = getCalendarDays(month, year);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row gy-4 justify-content-between">

        <div className="col-12 col-md-10 col-lg-5 d-flex flex-column align-items-center">
          <div className="d-flex align-items-center p-3 rounded w-100 bg-white shadow-sm">
            <img
              src={image}
              alt={name}
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div>
              <h6 className="mb-1 fs-4">Welcome {name}</h6>
              <small className="text-muted fs-6">It’s {today}</small>
            </div>
          </div>

          <div className="card p-3 mt-4 w-100" style={{ backgroundColor: radiumGreen }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <strong>Upcoming Exams</strong>
              <button
                className="btn btn-dark btn-sm"
                onClick={() =>
                  navigate('/exam', {
                    state: { name: name, image: image, today },
                  })
                }
              >
                Start a Exam
              </button>
            </div>

            <div className="border border-black p-2 rounded mb-2 bg-transparent d-flex justify-content-between align-items-center">
              <div>
                <strong>Figma Technical Questions</strong><br />
                <small className="text-muted">Duration: 30 Minutes</small>
              </div>
              <div className="text-end">
                <small className="fw-bold">July 15, 2025</small><br />
                <small className="text-muted">2:30 PM</small>
              </div>
            </div>

            <div className="border border-black p-2 rounded bg-transparent d-flex justify-content-between align-items-center">
              <div>
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

        <div className="col-12 col-md-10 col-lg-5 d-flex flex-column align-items-center">
          <div className="card text-center p-4 w-100" style={{ backgroundColor: '#e6ffb3' }}>
            <img
              src={image}
              alt={name}
              className="rounded-circle mx-auto mb-3 img-fluid"
              style={{ maxWidth: '100px', height: 'auto' }}
            />
            <h5>{name}</h5>
            <p className="text-muted">{course}</p>

            <h6 className="text-start mb-3">Course Progress</h6>
            <div className="mb-2">
              <div className="d-flex mb-2 justify-content-between">
                <small>Figma</small><small>95%</small>
              </div>
              <div className="progress" style={{ height: 15 }}>
                <div className="progress-bar" style={{ width: '95%', backgroundColor: radiumGreen }}></div>
              </div>
            </div>
            <div>
              <div className="d-flex mb-2 justify-content-between">
                <small>Adobe Photoshop</small><small>20%</small>
              </div>
              <div className="progress" style={{ height: 15 }}>
                <div className="progress-bar" style={{ width: '20%', backgroundColor: radiumGreen }}></div>
              </div>
            </div>

            <h6 className="text-start mt-4 mb-3">Exam Calendar</h6>
            <div className="rounded p-3 overflow-auto" style={{ backgroundColor: "#1C2B29" }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold" style={{ color: radiumGreen }}>
                  {monthNames[month]} {year}
                </span>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-light rounded-circle d-flex justify-content-center align-items-center me-2"
                    onClick={handlePrevMonth}
                    style={{ width: "36px", height: "36px", fontSize: "20px", padding: 0 }}
                  >
                    ‹
                  </button>
                  <button
                    className="btn btn-sm btn-outline-light rounded-circle d-flex justify-content-center align-items-center"
                    onClick={handleNextMonth}
                    style={{ width: "36px", height: "36px", fontSize: "20px", padding: 0 }}
                  >
                    ›
                  </button>
                </div>
              </div>

              <table className="table table-borderless table-sm mb-0 text-center">
                <thead>
                  <tr>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <th key={d} style={{ color: radiumGreen, backgroundColor: '#1C2B29' }}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="small fw-bold">
                  {calendarDays.map((week, i) => (
                    <tr key={i}>
                      {week.map((day, j) => {
                        const isToday =
                          day === new Date().getDate() &&
                          month === new Date().getMonth() &&
                          year === new Date().getFullYear();

                        return (
                          <td
                            key={j}
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#1C2B29',
                              color: isToday ? 'white' : radiumGreen,
                              textAlign: 'center',
                              verticalAlign: 'middle',
                              padding: 0,
                            }}
                          >
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                backgroundColor: isToday ? radiumGreen : 'transparent',
                                color: isToday ? 'white' : radiumGreen,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 'auto',
                              }}
                            >
                              {day}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TraineeProfile;
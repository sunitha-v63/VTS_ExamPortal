import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import profilePic from '../assets/Images/Img1.png'
import notificationIcon from "../assets/Images/Notification.png";
import Trainee from '../Components/Trainee.jsx';
import Questionpaper from '../Components/Questionpaper.jsx';
import traineesIcon from '../assets/Images/Total Trainees.png';
import coursesIcon from '../assets/Images/courses.png';
import examsIcon from '../assets/Images/Exams.png'  
import { useNavigate } from 'react-router-dom'; 

function Overview() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <div className="container py-4">
        <div className="row align-items-center mb-4">
          <div className="col-md-4 text-md-start text-center mb-2 mb-md-0">
            <h4 className="fw-bold">Good Morning!!!</h4>
            <p className="text-muted mb-0">It's {formattedDate}</p>

          </div>

          <div className="col-md-4 d-flex justify-content-center mb-2 mb-md-0">
            <div className="input-group" style={{ maxWidth: "300px", width: "100%" }}>
              <input type="text" className="form-control border-black p-2" placeholder="Search" />
              <button className="btn text-dark border-black p-2 px-3" style={{ backgroundColor: "#d8f275" }}>
                <FaSearch />
              </button>
            </div>
          </div>

          {/* <div className="col-md-4 d-flex justify-content-end gap-3" style={{ paddingRight: "20px" }}>
            <img
              src={notificationIcon}
              alt="Notification"
              width={25}
              height={35}
              style={{ marginRight: "20px", marginTop: "5px" }}
            />
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle"
              width={55}
              height={55}
              style={{ marginRight: "100px" }}
            />
          </div> */}
          <div className="col-md-4 d-flex justify-content-end gap-3" style={{ paddingRight: "20px", position: "relative" }}>
            <img
              src={notificationIcon}
              alt="Notification"
              width={25}
              height={35}
              style={{ marginRight: "20px", marginTop: "5px" }}
            />
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle"
              width={55}
              height={55}
              style={{ marginRight: "100px", cursor: "pointer" }}
              onClick={() => setShowLogout(prev => !prev)}
            />

            {/* Logout Dropdown */}
            {showLogout && (
              <div
                style={{
                  position: "absolute",
                  top: "70px",
                  right: "100px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 1000
                }}
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  navigate("/");
                }}
              >
                Logout
              </div>
            )}
          </div>

        </div>
      </div>
      {/* -----container2 */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="p-2 rounded bg-warning-subtle d-flex justify-content-between align-items-center">
            <div className="mb-3">
              <small className="text-muted">Total Trainees</small>
              <h5 className="fw-bold mb-0">500</h5>
            </div>
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "#fff", width: "50px", height: "50px" }}
            >
              <img src={traineesIcon} alt="Trainees" width={20} />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-2 rounded d-flex justify-content-between align-items-center" style={{ backgroundColor: "rgb(195, 243, 195)" }}>
            <div className="mb-3">
              <small className="text-muted">Active Courses</small>
              <h5 className="fw-bold mb-0">15</h5>
            </div>
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "#fff", width: "50px", height: "50px" }}
            >
              <img src={coursesIcon} alt="Courses" width={20} />

            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="p-2 rounded d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#d461ac" }}
          >
            <div className="mb-3">
              <small>Upcoming Exams</small>
              <h5 className="fw-bold mb-0">12</h5>
            </div>
            <div
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{ backgroundColor: "#fff", width: "50px", height: "50px", border: "2px solid #fff" }}
            >
              <img src={examsIcon} alt="Exams" width={20} />
            </div>
          </div>
        </div>
      </div>
      {/* ---container3 */}
      <Trainee />
      <Questionpaper />
    </>
  )
}

export default Overview;

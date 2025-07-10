import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Overviewimg from "../assets/Images/Overview.png";
import designimg from "../assets/Images/Design.png";
import Examimg from "../assets/Images/Exam.png";
import resultimg from "../assets/Images/result.png";
import logo from "../assets/Images/logo.png";


export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <div
        className={`offcanvas offcanvas-start d-md-none ${sidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={sidebarOpen ? { visibility: 'visible' } : {}}
      >
        <div className="offcanvas-header">
          <button className="btn-close" onClick={() => setSidebarOpen(false)} />
        </div>
        <div className="offcanvas-body" style={{backgroundColor:"#201f31"}}>
          <nav className="nav flex-column">
            <NavLink
              to="/overview"
              end
              className="nav-link d-flex align-items-center"
              style={({ isActive }) => ({
                color: isActive ? '#D8F275' : '#000'
              })}
              onClick={() => setSidebarOpen(false)}
            >
              <img src={Overviewimg} alt="Home" className="me-2" />
              Overview
            </NavLink>
            <NavLink
              to="/designing"
              className="nav-link d-flex align-items-center"
              style={({ isActive }) => ({
                color: isActive ? '#D8F275' : '#000',
              })}
              onClick={() => setSidebarOpen(false)}
            >
              <img src={designimg} alt="Products" className="me-2" style={{backgroundColor:"#fff"}}/>
              Designing
            </NavLink>
            <NavLink
              to="/exam"
              className="nav-link d-flex align-items-center"
              style={({ isActive }) => ({
                color: isActive ? '#D8F275' : '#000',
              })}
              onClick={() => setSidebarOpen(false)}
            >
              <img src={Examimg} alt="Products" className="me-2" style={{backgroundColor:"#fff"}}/>
              Exam
            </NavLink>
            <NavLink
              to="/result"
              className="nav-link d-flex align-items-center"
              style={({ isActive }) => ({
                color: isActive ? '#D8F275' : '#000',
              })}
              onClick={() => setSidebarOpen(false)}
            >
              <img src={resultimg} alt="Products" className="me-2" style={{backgroundColor:"#fff"}}/>
              Result
            </NavLink>
          </nav>
        </div>
      </div>
      <aside className="sidebar d-none d-md-block">
        <div className="brand-container" style={{backgroundColor:"#fff"}}>
          <img src={logo} alt="vts" className="sidebar-logo mb-3 me-2" />
          <span className="mobile-title fw-bold" style={{fontSize:"18px",color:"201f31"}}>VTS Exam Portal</span>
        </div>
        <nav className="nav flex-column">
          <NavLink
            to="/overview"
            end
            className="nav-link d-flex align-items-center"
              style={({ isActive }) => ({
    color: isActive ? '#D8F275' : '#fff',  // active green, inactive white
    backgroundColor: 'transparent',        // ensure no BG applied
    padding: '10px 16px',
  })}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={Overviewimg} alt="Home" className="me-2" />
            Overview
          </NavLink>
          <NavLink
            to="/designing"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              color: isActive ? '#D8F275' : '#000',
            })}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={designimg} alt="Products" className="me-2" style={{backgroundColor:"#fff"}}/>
            Designing
          </NavLink>
          <NavLink
            to="/exam"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              color: isActive ? '#D8F275' : '#000',
            })}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={Examimg} alt="Products" className="me-2" style={{backgroundColor:"#fff"}}/>
            Exam
          </NavLink>
          <NavLink
            to="/result"
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              color: isActive ? '#D8F275' : '#000',
            })}
            onClick={() => setSidebarOpen(false)}
          >
            <img src={resultimg} alt="Products" className="me-2" style={{backgroundColor:"#fff"}}/>
            Result
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
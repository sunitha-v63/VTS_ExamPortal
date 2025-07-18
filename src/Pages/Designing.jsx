import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import Trainee from "../Components/Trainee";
import Questionpaper from "../Components/Questionpaper";
import AddTraineeModal from "../Components/Addtrainee";
import "bootstrap/dist/css/bootstrap.min.css";

const Designing = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddTrainee, setShowAddTrainee] = useState(false);
  const [formData, setFormData] = useState({
    traineeName: "",
    courseName: "",
    duration: "",
    mode: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "VTS_Exam_Portal | Designing";
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.traineeName.trim()) newErrors.traineeName = "Required";
    else if (!/^[A-Za-z\s]+$/.test(formData.traineeName.trim())) newErrors.traineeName = "Only letters and spaces";
    if (!formData.courseName.trim()) newErrors.courseName = "Required";
    if (!formData.duration.trim()) newErrors.duration = "Required";
    if (!formData.mode) newErrors.mode = "Please select Online or Offline";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitFilter = () => {
    if (!validateForm()) return;
    setShowModal(false);
    navigate(formData.mode === "online" ? "/onlinetrainees" : "/offlinetrainees");
  };

  const role = localStorage.getItem("userRole");
  const isAdminOrTrainer = role === "admin" || role === "trainer";
  return (
    <div className="d-flex">
      <div className="container py-4 flex-grow-1">
        <div className="d-flex flex-wrap justify-content-around align-items-center mb-4 gap-3">
          <div className="input-group" style={{ maxWidth: "320px", width: "100%" }}>
            <input type="text" className="form-control border-black p-3" placeholder="Search" />
            <button className="btn text-dark border-black p-3 px-4" style={{ backgroundColor: "#d8f275" }}>
              <FaSearch />
            </button>
          </div>
          <div className="d-flex gap-5" style={{ marginRight: "200px" }}>
            <button
              className="btn btn-dark d-flex align-items-center gap-2 px-3"
              onClick={toggleModal}
              disabled={!isAdminOrTrainer}
              title={!isAdminOrTrainer ? "Access restricted" : ""}
            >
              <FaFilter /> Filter
            </button>
            <button
              className="btn btn-dark"
              onClick={() => setShowAddTrainee(true)}
              disabled={!isAdminOrTrainer}
              title={!isAdminOrTrainer ? "Access restricted" : ""}
            >
              + Add Trainee
            </button>
            {showAddTrainee && (
              <AddTraineeModal
                setShowAddTrainee={setShowAddTrainee}
                navigate={navigate}
              />
            )}
          </div>
        </div>
        <Trainee />
        <Questionpaper />
      </div>
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content animate__animated animate__fadeIn w-75 px-3 mx-5">
                <div className="modal-header">
                  <h5 className="modal-title">Filter By</h5>
                  <button type="button" className="btn-close" onClick={toggleModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Trainee's Name</label>
                    <input
                      name="traineeName"
                      className={`form-control w-75 ${errors.traineeName ? "is-invalid" : ""}`}
                      value={formData.traineeName}
                      onChange={handleChange}
                    />
                    {errors.traineeName && <div className="text-danger">{errors.traineeName}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Course Name</label>
                    <input
                      name="courseName"
                      className={`form-control w-75 ${errors.courseName ? "is-invalid" : ""}`}
                      value={formData.courseName}
                      onChange={handleChange}
                    />
                    {errors.courseName && <div className="text-danger">{errors.courseName}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Duration</label>
                    <input
                      name="duration"
                      className={`form-control w-75 ${errors.duration ? "is-invalid" : ""}`}
                      value={formData.duration}
                      onChange={handleChange}
                    />
                    {errors.duration && <div className="text-danger">{errors.duration}</div>}
                  </div>
                  <div className="mb-3">
                    <label>Class Mode</label>
                    <div className="form-check custom-radio">
                      <input
                        type="radio"
                        name="mode"
                        value="online"
                        checked={formData.mode === "online"}
                        onChange={handleChange}
                        id="radioOnline"
                        className="form-check-input"
                      />
                      <label htmlFor="radioOnline" className="form-check-label">Online</label>
                    </div>
                    <div className="form-check custom-radio">
                      <input
                        type="radio"
                        name="mode"
                        value="offline"
                        checked={formData.mode === "offline"}
                        onChange={handleChange}
                        id="radioOffline"
                        className="form-check-input"
                      />
                      <label htmlFor="radioOffline" className="form-check-label">Offline</label>
                    </div>
                    {errors.mode && <div className="text-danger">{errors.mode}</div>}
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn px-4" style={{ backgroundColor: "#d8f275" }} onClick={handleSubmitFilter}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
};

export default Designing;

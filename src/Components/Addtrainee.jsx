import React, { useState } from "react";
import { onlineTrainees } from "../data/OnlineTrainee";
import { offlineTrainees } from "../data/OfflineTrainee";

const AddTraineeModal = ({ setShowAddTrainee, navigate }) => {
  const [formData, setFormData] = useState({
    trainerName: "", 
    name: "",
    duration: "",
    course: "",
    classMode: "Online",
    email: "",
    phone: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(f => ({ ...f, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { trainerName, name, duration, course, email, phone, classMode } = formData;
    if (!trainerName || !name || !duration || !course || !email || !phone) {
      setError("All fields are required!img(optional)");
      return;
    }
    const newTrainee = { id: Date.now(), ...formData };

    if (classMode === "Online") {
      onlineTrainees.push(newTrainee);
      navigate("/onlinetrainees");
    } else {
      offlineTrainees.push(newTrainee);
      navigate("/offlinetrainees");
    }

    setFormData({
      trainerName: "",
      name: "",
      duration: "",
      course: "",
      classMode: "Online",
      email: "",
      phone: "",
      image: "",
    });
    setImagePreview(null);
    setShowAddTrainee(false);
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setShowAddTrainee(false)}>
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Add New Trainee</h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddTrainee(false)} />
          </div>
          <div className="modal-body" style={{ backgroundColor: "#D8F275" }}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Trainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.trainerName}
                  onChange={e => setFormData(f => ({ ...f, trainerName: e.target.value }))}
                />
              </div>
              {["name", "duration", "course", "email", "phone"].map(field => (
                <div key={field} className="col-md-6">
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    className="form-control"
                    value={formData[field]}
                    onChange={e => setFormData(f => ({ ...f, [field]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="col-md-6">
                <label className="form-label">Class Mode</label>
                <select
                  className="form-select"
                  value={formData.classMode}
                  onChange={e => setFormData(f => ({ ...f, classMode: e.target.value }))}
                >
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            {imagePreview && (
              <div className="text-center mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn" style={{ backgroundColor: "#201F31", color: "white" }}>
              Save Trainee
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddTrainee(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTraineeModal;

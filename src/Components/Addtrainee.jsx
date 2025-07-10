import React, { useState } from "react";
import { onlineTrainees } from "../data/OnlineTrainee";
import { offlineTrainees } from "../data/OfflineTrainee";

const AddTraineeModal = ({ setShowAddTrainee }) => {
  const [formData, setFormData] = useState({
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
    if (file && file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.duration || !formData.course || !formData.email || !formData.phone) {
      setError("All fields are required.");
      return;
    }

    const newTrainee = {
      id: Date.now(),
      ...formData,
    };

    if (formData.classMode === "Online") {
      onlineTrainees.push(newTrainee);
    } else {
      offlineTrainees.push(newTrainee);
    }

    setFormData({
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
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => setShowAddTrainee(false)}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">Add New Trainee</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowAddTrainee(false)}
            />
          </div>
          <div className="modal-body" style={{backgroundColor:"#D8F275"}}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Course</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Class Mode</label>
                <select
                  className="form-select"
                  value={formData.classMode}
                  onChange={(e) =>
                    setFormData({ ...formData, classMode: e.target.value })
                  }
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
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
            <button type="submit" className="btn" style={{backgroundColor:"#201F31",color:"white"}}>
              Save Trainee
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowAddTrainee(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTraineeModal;
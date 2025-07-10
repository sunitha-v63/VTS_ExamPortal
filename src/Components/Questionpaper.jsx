import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Questionpaper = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const uploadedFile = e.target.files[0];
    validateAndSetFile(uploadedFile);
  };

  const validateAndSetFile = (file) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (file && allowedTypes.includes(file.type)) {
      if (file.size <= 10 * 1024 * 1024) {
        setFile(file);
        setError("");
      } else {
        setError("File exceeds 10MB limit.");
      }
    } else {
      setError("Only PDF, DOC, or DOCX files are allowed.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  return (
    <div className="container my-4">
      <h5 className="fw-bold mb-3">Upload Question Paper</h5>
      <div
        className="border-primary rounded text-center py-5 px-3"
        style={{
          borderStyle: "dashed",
          borderWidth: "2px",
          cursor: "pointer"
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt size={40} className="mb-2 text-secondary" />
        <p className="mb-2">Drag and drop your files here</p>
        <p className="mb-2">or</p>
        <label className="btn btn-dark">
          Browse Files
          <input type="file" hidden onChange={handleFile} accept=".pdf,.doc,.docx" />
        </label>
        <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
          Supported formats: PDF, DOC, DOCX (Max: 10MB)
        </p>
        {file && <p className="text-success mt-2">File selected: {file.name}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Questionpaper;
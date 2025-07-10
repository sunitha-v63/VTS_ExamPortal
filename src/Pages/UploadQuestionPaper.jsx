import React, { useRef, useEffect } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadQuestionPaper = () => {
  useEffect(() => { document.title = 'VTS_Exam_Portal | Development'; }, []);

  return (
    <div className="d-flex">
      <div className="container-fluid p-4">
        <UploadBox label="Upload Technical Question Paper" />
        <UploadBox label="Upload Practical Question Paper" />
      </div>
    </div>
  );
};

const UploadBox = ({ label }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // You can now upload this file via FormData, e.g. fetch/axios
    }
  };

  return (
    <div className="border border-warning rounded p-4 mb-4" style={{ borderColor: '#d6ff94' }}>
      <h6>{label}</h6>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />

      <div
        className="border border-warning border-dashed d-flex flex-column align-items-center justify-content-center p-5 mt-3"
        style={{ borderColor: '#d6ff94', minHeight: '150px', borderStyle: 'dashed' }}
        onClick={handleButtonClick}
      >
        <FaCloudUploadAlt size={40} color="#b2d634" className="mb-3" />
        <p>Drag and drop your files here</p>
        <p className="mb-2">or</p>
        <button 
          type="button"
          className="btn btn-dark btn-sm mb-2"
          onClick={handleButtonClick}
        >
          Browse Files
        </button>
        <small className="text-muted">
          Supported formats: PDF, DOC, DOCX (Max: 10MB)
        </small>
      </div>
    </div>
  );
};

export default UploadQuestionPaper;

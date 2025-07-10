import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bgimg from "../assets/Images/LoginImage.png";

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [forgotData, setForgotData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [regError, setRegError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/overview');
    }
  }, [navigate]);

  const validate = (data, forForgot = false) => {
    const errs = {};
    if (!data.email.includes('@')) errs.email = 'Valid email is required';
    if (data.password.length < 6) errs.password = 'Minimum 6 characters required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleForgotChange = e =>
    setForgotData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = e => {
    e.preventDefault();
    if (!validate(formData)) return;

    const u = JSON.parse(localStorage.getItem('user'));
    if (u && u.email === formData.email && u.password === formData.password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/overview');
    } else {
      setErrors({ general: 'Invalid credentials' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;

    const existing = JSON.parse(localStorage.getItem('user'));
    if (existing && existing.email === formData.email) {
      setRegError('Email already registered');
      return;
    }

    localStorage.setItem('user', JSON.stringify(formData));
    setRegError('');
    alert('Registered Successfully!');
    setIsRegistering(false);
  };

  const handleResetPassword = e => {
    e.preventDefault();
    if (!validate(forgotData, true)) return;

    const existing = JSON.parse(localStorage.getItem('user'));
    if (existing && existing.email === forgotData.email) {
      localStorage.setItem('user', JSON.stringify(forgotData));
      alert('Password Reset Successful!');
      setShowForgot(false);
    } else {
      setErrors({ forgot: 'Email not found. Please register.' });
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-end"
      style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}>
      <div className="p-4 shadow rounded" style={{ maxWidth: '600px', width: '100%', marginRight: '60px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
        <h3 className="text-center mb-4">{isRegistering ? 'Register' : 'Login'}</h3>
        <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {errors.general && <div className="text-danger">{errors.general}</div>}
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          {isRegistering && regError && <div className="text-danger mt-2">{regError}</div>}

          <div className="d-flex justify-content-between mt-3">
            {!isRegistering && (
              <>
                <span className="text-secondary" role="button" onClick={() => setShowForgot(true)}>Forgot Password?</span>
                <span className="text-secondary" role="button" onClick={() => { setIsRegistering(true); setErrors({}); setRegError(''); }}>Register</span>
              </>
            )}
            {isRegistering && (
              <span className="text-secondary" role="button" onClick={() => setIsRegistering(false)}>Back to Login</span>
            )}
          </div>

          <div className="text-center">
            <Button type="submit" className="w-75 mt-4" style={{ backgroundColor: '#D3F357', color: '#000', border: 'none' }}>
              {isRegistering ? 'Register' : 'Login'}
            </Button>
          </div>
        </Form>
      </div>

      {/* Forgot Modal */}
      <Modal show={showForgot} onHide={() => setShowForgot(false)}>
        <Modal.Header closeButton><Modal.Title>Reset Password</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetPassword}>
            {errors.forgot && <div className="text-danger">{errors.forgot}</div>}
            <Form.Group controlId="forgotEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your registered email" onChange={handleForgotChange} isInvalid={!!errors.forgot}/>
            </Form.Group>
            <Form.Group controlId="forgotPassword" className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="New password" onChange={handleForgotChange} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowForgot(false)}>Cancel</Button>
              <Button variant="secondary" type="submit">Reset Password</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForm;

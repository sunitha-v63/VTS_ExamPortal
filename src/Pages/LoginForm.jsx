import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bgimg from '../assets/Images/LoginImage.png';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    image: '',
  });
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
    if (!forForgot && !data.role) errs.role = 'Please select a role';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = e => {
    e.preventDefault();
    if (!validate(formData)) return;

    const stored = JSON.parse(localStorage.getItem('user'));
    if (
      stored &&
      stored.email === formData.email &&
      stored.password === formData.password &&
      stored.role === formData.role
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('currentUserName', stored.name || '');
      localStorage.setItem('currentUserImage', stored.image || '');

      navigate('/overview');
    } else {
      setErrors({ general: 'Invalid credentials or role' });
    }
  };

  const handleRegister = e => {
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
      localStorage.setItem('user', JSON.stringify({ ...existing, password: forgotData.password }));
      alert('Password Reset Successful!');
      setShowForgot(false);
    } else {
      setErrors({ forgot: 'Email not found. Please register.' });
    }
  };

  return (
    <>
    <div className="login-wrapper">
     <div
    className="vh-100 d-flex align-items-center justify-content-end"
    style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}
  >
    <div
      className="login-container p-4 shadow rounded"
      style={{
        maxWidth: '600px',
        width: '100%',
        marginRight: '60px',
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}
    >
        <h3 className="text-center mb-4">{isRegistering ? 'Register' : 'Login'}</h3>
        <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {errors.general && <div className="text-danger">{errors.general}</div>}

          {isRegistering && (
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group controlId="email" className="mt-3">
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

          <Form.Group className="mt-3">
            <Form.Label>Select Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="trainee">Trainee</option>
              <option value="trainer">Trainer</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
          </Form.Group>

          {regError && <div className="text-danger mt-2">{regError}</div>}

          <div className="d-flex justify-content-between mt-3">
            {!isRegistering ? (
              <>
                <span className="text-secondary" role="button" onClick={() => setShowForgot(true)}>
                  Forgot Password?
                </span>
                <span className="text-secondary" role="button" onClick={() => {
                  setIsRegistering(true);
                  setErrors({});
                  setRegError('');
                }}>
                  Register
                </span>
              </>
            ) : (
              <span className="text-secondary" role="button" onClick={() => setIsRegistering(false)}>
                Back to Login
              </span>
            )}
          </div>

          <div className="text-center mt-4">
            <Button type="submit" className="w-75" style={{ backgroundColor: '#D3F357', color: '#000', border: 'none' }}>
              {isRegistering ? 'Register' : 'Login'}
            </Button>
          </div>
        </Form>
      </div>

      <Modal show={showForgot} onHide={() => setShowForgot(false)}>
        <Modal.Header closeButton><Modal.Title>Reset Password</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetPassword}>
            {errors.forgot && <div className="text-danger">{errors.forgot}</div>}
            <Form.Group controlId="forgotEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter registered email"
                onChange={e => setForgotData(prev => ({ ...prev, email: e.target.value }))}
                isInvalid={!!errors.forgot}
              />
            </Form.Group>
            <Form.Group controlId="forgotPassword" className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="New password"
                onChange={e => setForgotData(prev => ({ ...prev, password: e.target.value }))}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowForgot(false)}>Cancel</Button>
              <Button variant="secondary" type="submit">Reset Password</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </div>
    </>
  );
};

export default LoginForm;

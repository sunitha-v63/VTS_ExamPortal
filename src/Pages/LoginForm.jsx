import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bgimg from "../assets/Images/LoginImage.png";

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [forgotData, setForgotData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showRegister, setShowRegister] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            navigate('/overview');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleForgotChange = (e) => {
        setForgotData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.email.includes('@')) errs.email = 'Valid email is required';
        if (formData.password.length < 6) errs.password = 'Minimum 6 characters required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
            alert('Login Successful!');
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/overview');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleRegister = () => {
        if (!validate()) return;
        localStorage.setItem('user', JSON.stringify(formData));
        alert('Registered Successfully!');
        setShowRegister(false);
    };

    const handleResetPassword = () => {
        const existingUser = JSON.parse(localStorage.getItem('user'));
        if (existingUser && existingUser.email === forgotData.email) {
            localStorage.setItem('user', JSON.stringify(forgotData));
            alert('Password Reset Successful!');
            setShowForgot(false);
        } else {
            alert('Email not found. Please register.');
        }
    };

    return (
        <div
            className="vh-100 d-flex align-items-center justify-content-end"
            style={{
                backgroundImage: `url(${bgimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow:"hidden"
            }}
        >
            <div
                className="p-4 shadow rounded"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: 'transparent',
                    marginRight: '60px'
                }}
            >
                <h3 className="text-center mb-4">Login</h3>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your Email Id"
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
                            placeholder="Enter your Password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            style={{ fontSize: '16px' }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-3">
                        <span className="text-secondary" role="button" onClick={() => setShowForgot(true)}>Forgot Password?</span>
                        <span className="text-secondary" role="button" onClick={() => setShowRegister(true)}>Register</span>
                    </div>

                    <div className="text-center">
                        <Button
                            type="submit"
                            className="w-75 mt-4"
                            style={{ backgroundColor: '#D3F357', color: '#000', border: 'none' }}
                        >
                            Login
                        </Button>
                    </div>
                </Form>
            </div>

            {/* Register Modal */}
            <Modal show={showRegister} onHide={() => setShowRegister(false)}>
                <Modal.Header closeButton><Modal.Title>Register</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="registerEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="registerPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRegister(false)}>Close</Button>
                    <Button variant="secondary" onClick={handleRegister}>Register</Button>
                </Modal.Footer>
            </Modal>

            {/* Forgot Password Modal */}
            <Modal show={showForgot} onHide={() => setShowForgot(false)}>
                <Modal.Header closeButton><Modal.Title>Reset Password</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="forgotEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your registered email"
                                onChange={handleForgotChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="forgotPassword" className="mt-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                onChange={handleForgotChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowForgot(false)}>Cancel</Button>
                    <Button variant="secondary" onClick={handleResetPassword}>Reset Password</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginForm;

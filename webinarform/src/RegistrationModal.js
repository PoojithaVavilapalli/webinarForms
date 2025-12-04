import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import { motion } from "framer-motion";
import "./webinarpage.css";


const WebinarPage = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", role: "", linkedIn: "",
    college: "", degree: "", branch: "", passingYear: "", location: "",
    organization: "", experience: "", workLocation: "",
    // description field removed
  });
   const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    linkedIn: "",
    college: "",
    degree: "",
    branch: "",
    passingYear: "",
    location: "",
    organization: "",
    experience: "",
    workLocation: "",
  };

  const [errors, setErrors] = useState({});
  
  // Toast states
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.email) newErrors.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone required";
    if (!formData.role) newErrors.role = "Required";

    if (formData.role === "Student") {
      if (!formData.college) newErrors.college = "Required";
      if (!formData.degree) newErrors.degree = "Required";
      if (!formData.branch) newErrors.branch = "Required";
      if (!formData.passingYear) newErrors.passingYear = "Required";
      if (!formData.location) newErrors.location = "Required";
    }

    if (formData.role === "Working Professional") {
      if (!formData.organization) newErrors.organization = "Required";
      if (!formData.experience) newErrors.experience = "Required";
      if (!formData.workLocation) newErrors.workLocation = "Required";
      // description validation removed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/api/register`);
      setFormData(initialForm);
      handleClose();
      setToast({ show: true, message: "Thank you! 🎉 Registration Successful! Check your email.", type: "success" });
    } catch (err) {
      setToast({ show: true, message: "Error submitting form. Please try again.", type: "danger" });
    }
  };

  return (
    <>
      {/* Toast Container - placed at top-right of the screen */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={5000}
          autohide
          bg={toast.type}
          className="text-white shadow-lg"
        >
          <Toast.Header closeButton className="bg-transparent border-0">
            <strong className="me-auto">
              {toast.type === "success" ? "✅ Success" : "❌ Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="fw-medium fs-5">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Main Background - unchanged */}
      <div
        className="min-vh-100"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#e2e8f0",
          padding: "40px 20px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="container" style={{ maxWidth: "1200px" }}>
          {/* Logo - Left Aligned */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-5"
          >
            <img
              src="https://meletenova.com/assets/logo2.png"
              alt="Logo"
              style={{ height: "80px" }}
            />
          </motion.div>

          {/* Hero Section: Image + Content */}
          <div className="row align-items-start g-5">
            {/* Left: Poster Image + CTA */}
            <div className="col-lg-6 order-lg-1 order-2">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center text-lg-start mb-4"
              >
                <img
                  src="/assets/poster.jpg"
                  alt="Webinar Poster"
                  className="img-fluid rounded-4 shadow-2xl"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "8px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                />
              </motion.div>

              <div className="d-lg-none text-center mt-4"></div>

              <div className="d-none d-lg-block text-center">
                <div className="d-inline-block bg-primary text-white px-4 py-2 rounded-pill mt-20 fs-6" style={{
                  marginTop:"50px",
                  minWidth: "200px"
                }}>
                  ⏰ Duration: 1 hr 30 mins -- Free Registration
                </div>
                <br />
                <Button
                  onClick={handleOpen}
                  size="lg"
                  className="shadow-lg px-5 py-3 rounded-pill fw-bold"
                  style={{
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    border: "none",
                    fontSize: "1.3rem",
                    minWidth: "200px",
                    marginTop:"50px"
                  }}
                >
                  Register Now 
                </Button>
              </div>
            </div>

            {/* Right: All Text Content + Perks/Demos */}
            <div className="col-lg-6 order-lg-2 order-1">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="display-8 fw-bold mb-4" style={{ color: "#60a5fa" }}>
                  CyberShield 2025
                </h1>

                <div className="mb-5">
                  <h3 className="fw-bold text-info mb-3">Why This Webinar Matters</h3>
                  <p className="lead">
                    Cyber attacks are increasing daily. Most people don’t realize how easily their phones, passwords, and data can be compromised.
                  </p>
                  <p>This live session will change the way you see cybersecurity forever.</p>
                </div>

                <h3 className="fw-bold text-success mb-3">What You Will Learn</h3>
                <ul className="list-unstyled mb-5">
                  {[
                    "How hackers think and operate",
                    "Cybersecurity vs Ethical Hacking",
                    "Malware, botnets & real exploits",
                    "Top 5 myths that put you at risk",
                    "Live OTP bypass demo (SIM swap)",
                    "Secure your accounts in 10 mins"
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="mb-3 d-flex align-items-center fs-5"
                    >
                      <span className="text-warning me-3">✦</span> {item}
                    </motion.li>
                  ))}
                </ul>

                <hr className="border-secondary opacity-30 my-5" />

                <div className="row g-5">
                  <div className="col-md-6">
                    <h4 className="text-success fw-bold mb-3">Perks You Get</h4>
                    <ul className="list-unstyled">
                      {[
                        "Cybersecurity Roadmap PDF",
                        "Tool List & Cheat Sheets",
                        "Phishing Checklist",
                        "Exclusive Community Access",
                        "E-Certificate"
                      ].map((p, i) => (
                        <li key={i} className="mb-2">
                          <span className="text-success me-2">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <h4 className="text-danger fw-bold mb-3">Live Demos</h4>
                    <ul className="list-unstyled">
                      {[
                        "Fake login pages",
                        "URL manipulation",
                        "Password capture simulation",
                        "Instant fake link detection"
                      ].map((d, i) => (
                        <li key={i} className="mb-2">
                          <span className="text-danger me-2">⚡</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="d-lg-none text-center mt-5">
                  <div className="d-inline-block bg-primary text-white px-4 py-2 rounded-pill mb-4 fs-6">
                    ⏰ Duration: 1 hr 20 mins • Free Registration
                  </div>
                  <br />
                  <Button
                    onClick={handleOpen}
                    size="lg"
                    className="shadow-lg px-5 py-3 rounded-pill fw-bold"
                    style={{
                      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                      border: "none",
                      fontSize: "1.3rem",
                      minWidth: "300px",
                    }}
                  >
                    Register Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL - Clean form without progress bar or description field */}
      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
        <Modal.Header closeButton className="border-0 text-white" style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" }}>
          <Modal.Title className="fw-medium fs-4">Complete Your Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5" style={{ background: "#0f172a" }}>
          <Form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <Row className="g-4">
              <Col md={6}>
                <Form.Label className="text-white fw-medium">First Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                  className="bg-dark text-white border-0 rounded-3 shadow-sm"
                  style={{ height: "52px" }}
                  placeholder="Enter your first name"
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="text-white fw-medium">Last Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                  className="bg-dark text-white border-0 rounded-3 shadow-sm"
                  style={{ height: "52px" }}
                  placeholder="Enter your last name"
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="g-4 mt-3">
              <Col md={6}>
                <Form.Label className="text-white fw-medium">Email <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  className="bg-dark text-white border-0 rounded-3 shadow-sm"
                  style={{ height: "52px" }}
                  placeholder="you@example.com"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="text-white fw-medium">Phone <span className="text-danger">*</span></Form.Label>
                <PhoneInput
                  country="in"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputClass="w-100 bg-dark text-white border-0 rounded-3 shadow-sm"
                  containerClass="mt-1"
                  inputStyle={{ height: "52px", background: "#1e293b", border: "none", color: "#fff" }}
                  buttonClass="bg-dark border-0"
                />
                {errors.phone && <small className="text-danger d-block mt-1">{errors.phone}</small>}
              </Col>
            </Row>

            <div className="mt-4">
              <Form.Label className="text-white fw-medium">Current Role <span className="text-danger">*</span></Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-dark text-white border-0 rounded-3 shadow-sm"
                style={{ height: "52px" }}
              >
                <option value="">Select your role...</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
              </Form.Select>
              {errors.role && <small className="text-danger d-block mt-1">{errors.role}</small>}
            </div>

            {/* Student Fields */}
            {formData.role === "Student" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5 pt-4 border-top border-secondary"
              >
                <h5 className="text-info mb-4 fw-bold">Student Details</h5>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Label className="text-white fw-medium">College *</Form.Label>
                    <Form.Control name="college" value={formData.college} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="Your college name" />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="text-white fw-medium">Degree *</Form.Label>
                    <Form.Control name="degree" value={formData.degree} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., B.Tech, B.Sc" />
                  </Col>
                </Row>
                <Row className="g-4 mt-3">
                  <Col md={6}>
                    <Form.Label className="text-white fw-medium">Branch *</Form.Label>
                    <Form.Control name="branch" value={formData.branch} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., CSE, ECE" />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="text-white fw-medium">Passing Year *</Form.Label>
                    <Form.Control name="passingYear" value={formData.passingYear} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., 2026" />
                  </Col>
                </Row>
                <div className="mt-3">
                  <Form.Label className="text-white fw-medium">Location *</Form.Label>
                  <Form.Control name="location" value={formData.location} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="City, State" />
                </div>
              </motion.div>
            )}

            {/* Working Professional Fields - description removed */}
            {formData.role === "Working Professional" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5 pt-4 border-top border-secondary"
              >
                <h5 className="text-info mb-4 fw-bold">Professional Details</h5>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-medium">Organization *</Form.Label>
                  <Form.Control name="organization" value={formData.organization} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="Company name" />
                </Form.Group>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Label className="text-white fw-medium">Experience (years) *</Form.Label>
                    <Form.Control name="experience" value={formData.experience} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., 3" />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="text-white fw-medium">Work Location *</Form.Label>
                    <Form.Control name="workLocation" value={formData.workLocation} onChange={handleChange} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="City, State" />
                  </Col>
                </Row>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="text-center mt-5">
              <Button
                type="submit"
                size="lg"
                className="px-5 py-3 rounded-pill fw-bold shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #10b981, #34d399)",
                  border: "none",
                  fontSize: "1.1rem",
                }}
              >
                Complete Registration ✨
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WebinarPage;
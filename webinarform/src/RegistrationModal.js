import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import { motion } from "framer-motion";

const WebinarPage = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", role: "", linkedIn: "",
    college: "", degree: "", branch: "", passingYear: "", location: "",
    organization: "", experience: "", workLocation: "", description: "",
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  // Progress calculation
  useEffect(() => {
    let filled = 0;
    let totalFields = 5;

    if (formData.firstName) filled++;
    if (formData.lastName) filled++;
    if (formData.email) filled++;
    if (formData.phone) filled++;
    if (formData.role) filled++;

    if (formData.role === "Student") {
      totalFields = 10;
      if (formData.college) filled++;
      if (formData.degree) filled++;
      if (formData.branch) filled++;
      if (formData.passingYear) filled++;
      if (formData.location) filled++;
    }

    if (formData.role === "Working Professional") {
      totalFields = 9;
      if (formData.organization) filled++;
      if (formData.experience) filled++;
      if (formData.workLocation) filled++;
      if (formData.description) filled++;
    }

    setProgress(Math.round((filled / totalFields) * 100));
  }, [formData]);

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
      if (!formData.description) newErrors.description = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/register", formData);
      alert("🎉 Registration Successful! Check your email.");
      handleClose();
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <>
      {/* Main Background */}
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
            {/* Left: Poster Image + CTA (Duration + Button) */}
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

              {/* Duration + Register Button - Placed below image on mobile, beside on desktop */}
              <div className="d-lg-none text-center mt-4"></div>

              <div className="d-none d-lg-block text-center">
                <div className="d-inline-block bg-primary text-white px-4 py-2 rounded-pill mt-20 fs-6" style={{
                  marginTop:"50px",
                  minWidth: "200px"
                }}>
                  ⏰ Duration: 1 hr 20 mins 
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
                  Webinar on Cybersecurity
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

                {/* Perks & Live Demos Side by Side */}
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

                {/* Mobile-only CTA (shown below content on small screens) */}
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
                    Register Now – It's Free!
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Unchanged */}
      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
        <Modal.Header closeButton className="border-0 text-white" style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" }}>
          <Modal.Title className="fw-bold fs-3">Complete Your Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4" style={{ background: "#0f172a" }}>
          <div className="mb-4">
            {/* <div className="d-flex justify-content-between text-white mb-2">
              <span>Form Progress</span>
              <span>{progress}% Complete</span>
            </div> */}
            {/* <ProgressBar now={progress} animated variant="success" style={{ height: "10px", borderRadius: "10px" }} className="shadow-sm" /> */}
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Form fields remain exactly the same */}
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="text-white">First Name <span className="text-danger">*</span></Form.Label>
                <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} isInvalid={!!errors.firstName} className="bg-dark text-white border-0" />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label className="text-white">Last Name <span className="text-danger">*</span></Form.Label>
                <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} isInvalid={!!errors.lastName} className="bg-dark text-white border-0" />
              </Col>
            </Row>

            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Label className="text-white">Email <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="bg-dark text-white border-0" />
              </Col>
              <Col md={6}>
                <Form.Label className="text-white">Phone <span className="text-danger">*</span></Form.Label>
                <PhoneInput country="in" value={formData.phone} onChange={handlePhoneChange} inputClass="form-control bg-dark text-white border-0" />
                {errors.phone && <small className="text-danger d-block">{errors.phone}</small>}
              </Col>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label className="text-white">Current Role <span className="text-danger">*</span></Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} className="bg-dark text-white border-0">
                <option value="">Select your role...</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
              </Form.Select>
            </Form.Group>

            {/* Conditional fields remain unchanged */}
            {formData.role === "Student" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <hr className="border-secondary my-4" />
                <Row className="g-3">
                  <Col md={6}><Form.Label className="text-white">College *</Form.Label><Form.Control name="college" value={formData.college} onChange={handleChange} className="bg-dark text-white border-0" /></Col>
                  <Col md={6}><Form.Label className="text-white">Degree *</Form.Label><Form.Control name="degree" value={formData.degree} onChange={handleChange} className="bg-dark text-white border-0" /></Col>
                </Row>
                <Row className="g-3 mt-2">
                  <Col md={6}><Form.Label className="text-white">Branch *</Form.Label><Form.Control name="branch" value={formData.branch} onChange={handleChange} className="bg-dark text-white border-0" /></Col>
                  <Col md={6}><Form.Label className="text-white">Passing Year *</Form.Label><Form.Control name="passingYear" value={formData.passingYear} onChange={handleChange} className="bg-dark text-white border-0" /></Col>
                </Row>
                <Form.Group className="mt-3"><Form.Label className="text-white">Location *</Form.Label><Form.Control name="location" value={formData.location} onChange={handleChange} className="bg-dark text-white border-0" /></Form.Group>
              </motion.div>
            )}

            {formData.role === "Working Professional" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <hr className="border-secondary my-4" />
                <Form.Group className="mt-3"><Form.Label className="text-white">Organization *</Form.Label><Form.Control name="organization" value={formData.organization} onChange={handleChange} className="bg-dark text-white border-0" /></Form.Group>
                <Row className="g-3 mt-3">
                  <Col md={6}><Form.Label className="text-white">Experience (years) *</Form.Label><Form.Control name="experience" value={formData.experience} onChange={handleChange} className="bg-dark text-white border-0" /></Col>
                  <Col md={6}><Form.Label className="text-white">Work Location *</Form.Label><Form.Control name="workLocation" value={formData.workLocation} onChange={handleChange} className="bg-dark text-white border-0" /></Col>
                </Row>
                <Form.Group className="mt-3"><Form.Label className="text-white">Brief Description *</Form.Label><Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} className="bg-dark text-white border-0" /></Form.Group>
              </motion.div>
            )}

            <div className="text-end mt-5">
              <Button type="submit" size="lg" className="px-5 rounded-pill fw-bold" style={{ background: "linear-gradient(90deg, #10b981, #34d399)", border: "none" }}>
                Complete Registration
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WebinarPage;
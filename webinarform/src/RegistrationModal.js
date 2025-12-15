import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
  });
   const [isSubmitting, setIsSubmitting] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

  const initialForm = { ...formData };
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const modules = [
    "Cloud Computing Fundamentals",
    "Evolution of Cloud Technology",
    "Cloud Service Delivery Models",
    "Cloud Deployment Strategies",
    "Cloud Engineer Role Definition",
    "Core Cloud Building Blocks",
    "Cloud Security Foundation",
    "Practical Demonstration / Use Case",
    "Cloud Cost & Billing Awareness",
    "Cloud Career Landscape",
    "Learning Resources & Takeaways",
  ];

  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setErrors({});
    setFormData(initialForm);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone number required";
    if (!formData.role) newErrors.role = "Please select your role";

    if (formData.role === "Student") {
      if (!formData.college.trim()) newErrors.college = "Required";
      if (!formData.degree.trim()) newErrors.degree = "Required";
      if (!formData.branch.trim()) newErrors.branch = "Required";
      if (!formData.passingYear.trim()) newErrors.passingYear = "Required";
      if (!formData.location.trim()) newErrors.location = "Required";
    }
    if (formData.role === "Working Professional") {
      if (!formData.organization.trim()) newErrors.organization = "Required";
      if (!formData.experience.trim()) newErrors.experience = "Required";
      if (!formData.workLocation.trim()) newErrors.workLocation = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true)

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`, formData);
      setIsSubmitting(false)
      handleClose();
    setShowSuccess(true);
    } catch (err) {
      setToast({ show: true, message: "Submission failed. Please try again later.", type: "danger" });
    }
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={6000}
          autohide
          bg={toast.type}
          className="text-white shadow-lg border-0"
        >
          <Toast.Header closeButton className="bg-transparent border-0">
            <strong className="me-auto">
              {toast.type === "success" ? <i className="bi bi-check-circle me-2"></i> : <i className="bi bi-exclamation-triangle me-2"></i>}
              {toast.type === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="fw-medium">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div
        className="min-vh-100"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#e2e8f0",
          padding: "40px 15px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="container" style={{ maxWidth: "1280px" }}>
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

          <div className="row align-items-start g-5">
            {/* Right Column: Content (Title, Overview, Modules, CTA) */}
            <div className="col-lg-6 order-lg-2 order-1">
              <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <h1 className="display-5 fw-bold mb-4 text-center text-lg-start" style={{ color: "#60a5fa", lineHeight: "1.2" }}>
                  Cloud Computing & Cloud Engineering Workshop
                </h1>

                <div className="bg-slate-800 bg-opacity-50 rounded-4 p-4 p-md-5 mb-5 shadow-lg">
                  <h3 className="fw-bold text-info mb-3">Workshop Overview</h3>
                  <p className="lead text-light">
                    A comprehensive  workshop designed for students and professionals aspiring to build a career in cloud technology. 
                    Gain practical insights into cloud engineering roles, core concepts, live demonstrations, and a clear career roadmap.
                  </p>
                </div>

                <h3 className="fw-bold text-success mb-4">Workshop Modules</h3>
                <div className="bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-4 shadow-xl overflow-hidden">
                  {modules.map((title, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center px-4 px-md-5 py-3 transition-all"
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.4)",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.6)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.4)")}
                    >
                      <span
                        className="fw-bold me-4 flex-shrink-0"
                        style={{
                          color: "#60a5fa",
                          fontSize: "1.4rem",
                          width: "40px",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="text-light" style={{ fontSize: "1.1rem" }}>
                        {title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Session Info + OK Button (visible on all screens, placed here for mobile flow) */}
                <div className="text-center mt-5">
                  <br /><br />
                  <div className="d-inline-block bg-primary text-white px-4 py-2 rounded-pill mb-4 fw-medium ">
                    <i className="bi bi-clock me-2"></i>1 hour 30 min • Free Workshop
                  </div>
                  <br />
                  <Button
                    onClick={handleOpen}
                    size="lg"
                    className="shadow-lg px-5 py-4 rounded-pill fw-bold w-50"
                    style={{
                      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                      border: "none",
                      fontSize: "1.3rem",
                    }}
                  >
                    Register Now
          
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Left Column: Poster + Learning Sections (Image moved to bottom on mobile) */}
            <div className="col-lg-6 order-lg-1 order-2">
              {/* Desktop/Tablet: Image at top */}
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="text-center mb-5 d-none d-lg-block"
              >
                <img
                  src="/assets/aws.png"
                  alt="Cloud Engineering Workshop Poster"
                  className="img-fluid rounded-4"
                  style={{
                    maxWidth: "100%",
                    border: "8px solid rgba(96, 165, 250, 0.2)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  }}
                />
              </motion.div>

              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-4 p-4 p-md-5 shadow-xl mb-5 border border-slate-700"
              >
                <h3 className="fw-bold text-info mb-4 text-center">
                  <i className="bi bi-mortarboard-fill me-2"></i>What You'll Learn
                </h3>
                <div className="row g-4">
                  {[
                    "Cloud computing fundamentals and modern architecture patterns",
                    "IaaS, PaaS, SaaS — service models explained with real examples",
                    "Public, Private, Hybrid clouds — deployment strategies",
                    "Core services: Compute, Storage, Networking, Databases",
                    "Cost management, billing awareness, and optimization techniques",
                  ].map((item, i) => (
                    <div key={i} className="col-12">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-check-circle-fill text-success mt-1 me-3 flex-shrink-0"></i>
                        <p className="mb-0 text-light">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Takeaways & Perks */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-4 p-4 p-md-5 shadow-xl mb-5 border border-slate-700"
              >
                <h3 className="fw-bold text-primary mb-4 text-center">
                  <i className="bi bi-gift-fill me-2"></i>Key Takeaways & Benefits
                </h3>
                <div className="row g-4">
                  {[
                    "Certificate of Participation upon completion",
                    "Live Hands-on Demo of real cloud engineering workflows",
                    "Expert Career Guidance and cloud job market insights",
                    " Intensive Session packed with practical knowledge",
                    "Exclusive Learning Resources & Takeaways shared post-workshop",
                  ].map((item, i) => (
                    <div key={i} className="col-12">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-check-circle-fill text-success mt-1 me-3 flex-shrink-0"></i>
                        <p className="mb-0 text-light">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile: Image at the very bottom */}
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="text-center mt-5 d-lg-none"
              >
                <img
                  src="/assets/aws.png"
                  alt="Cloud Engineering Workshop Poster"
                  className="img-fluid rounded-4"
                  style={{
                    maxWidth: "100%",
                    border: "8px solid rgba(96, 165, 250, 0.2)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (unchanged) */}
      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
        <Modal.Header closeButton className="border-0 text-white" style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)" }}>
          <Modal.Title className="fw-semibold">Complete Your Free Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 p-md-5" style={{ background: "#0f172a" }}>
          <Form onSubmit={handleSubmit}>
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
                  placeholder="First name"
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
                  placeholder="Last name"
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
                  inputStyle={{ height: "52px", background: "#1e293b", border: "none", color: "#fff", width: "100%" }}
                  buttonStyle={{ background: "#1e293b", border: "none" }}
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
                isInvalid={!!errors.role}
                className="bg-dark text-white border-0 rounded-3 shadow-sm"
                style={{ height: "52px" }}
              >
                <option value="">Select your role...</option>
                <option value="Student">Student</option>
                <option value="Working Professional">Working Professional</option>
              </Form.Select>
              {errors.role && <small className="text-danger d-block mt-1">{errors.role}</small>}
            </div>

            {formData.role === "Student" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-5 pt-4 border-top border-secondary">
                <h5 className="text-info mb-4 fw-bold">Student Details</h5>
                <Row className="g-4">
                  <Col md={6}><Form.Label className="text-white fw-medium">College *</Form.Label><Form.Control name="college" value={formData.college} onChange={handleChange} isInvalid={!!errors.college} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="Your college name" /><Form.Control.Feedback type="invalid">{errors.college}</Form.Control.Feedback></Col>
                  <Col md={6}><Form.Label className="text-white fw-medium">Degree *</Form.Label><Form.Control name="degree" value={formData.degree} onChange={handleChange} isInvalid={!!errors.degree} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., B.Tech" /><Form.Control.Feedback type="invalid">{errors.degree}</Form.Control.Feedback></Col>
                </Row>
                <Row className="g-4 mt-3">
                  <Col md={6}><Form.Label className="text-white fw-medium">Branch *</Form.Label><Form.Control name="branch" value={formData.branch} onChange={handleChange} isInvalid={!!errors.branch} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., CSE" /><Form.Control.Feedback type="invalid">{errors.branch}</Form.Control.Feedback></Col>
                  <Col md={6}><Form.Label className="text-white fw-medium">Passing Year *</Form.Label><Form.Control name="passingYear" value={formData.passingYear} onChange={handleChange} isInvalid={!!errors.passingYear} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., 2026" /><Form.Control.Feedback type="invalid">{errors.passingYear}</Form.Control.Feedback></Col>
                </Row>
                <div className="mt-3">
                  <Form.Label className="text-white fw-medium">Location *</Form.Label>
                  <Form.Control name="location" value={formData.location} onChange={handleChange} isInvalid={!!errors.location} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="City, State" />
                  <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                </div>
              </motion.div>
            )}

            {formData.role === "Working Professional" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-5 pt-4 border-top border-secondary">
                <h5 className="text-info mb-4 fw-bold">Professional Details</h5>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white fw-medium">Organization *</Form.Label>
                  <Form.Control name="organization" value={formData.organization} onChange={handleChange} isInvalid={!!errors.organization} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="Company name" />
                  <Form.Control.Feedback type="invalid">{errors.organization}</Form.Control.Feedback>
                </Form.Group>
                <Row className="g-4">
                  <Col md={6}><Form.Label className="text-white fw-medium">Experience (years) *</Form.Label><Form.Control name="experience" value={formData.experience} onChange={handleChange} isInvalid={!!errors.experience} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="e.g., 3" /><Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback></Col>
                  <Col md={6}><Form.Label className="text-white fw-medium">Work Location *</Form.Label><Form.Control name="workLocation" value={formData.workLocation} onChange={handleChange} isInvalid={!!errors.workLocation} className="bg-dark text-white border-0 rounded-3 shadow-sm" style={{ height: "52px" }} placeholder="City, State" /><Form.Control.Feedback type="invalid">{errors.workLocation}</Form.Control.Feedback></Col>
                </Row>
              </motion.div>
            )}

            <div className="text-center mt-5">
              <Button
                type="submit"
                size="lg"
                className="px-5 py-3 rounded-pill fw-bold shadow-lg w-100 w-md-auto"
                style={{
                  background: "linear-gradient(90deg, #10b981, #34d399)",
                  border: "none",
                  fontSize: "1.2rem",
                }}
              >
                {isSubmitting ? (
    <>
      <span className="spinner-border spinner-border-sm me-2"></span>
      Registering...
    </>
  ) : (
    "Complete Registration ✨"
  )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
  show={showSuccess}
  onHide={() => setShowSuccess(false)}
  centered
  backdrop="static"
>
  <Modal.Body className="text-center p-5" style={{ background: "#0f172a" }}>
    <i
      className="bi bi-check-circle-fill text-success"
      style={{ fontSize: "4rem" }}
    ></i>

    <h3 className="mt-4 text-white fw-bold">
      Registration Successful 🎉
    </h3>

    <p className="text-light mt-3">
      Thank you for registering!  
      We’ve sent the workshop details to your email.
    </p>

    <Button
      className="mt-4 px-4 py-2 rounded-pill fw-bold"
      style={{
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
        border: "none",
      }}
      onClick={() => setShowSuccess(false)}
    >
      Got it 👍
    </Button>
  </Modal.Body>
</Modal>

    </>
  );
};

export default WebinarPage;
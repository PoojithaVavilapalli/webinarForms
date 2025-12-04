import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const RegistrationModal = () => {
  const [show, setShow] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    linkedIn: "",
    // Student fields
    college: "",
    degree: "",
    branch: "",
    passingYear: "",
    location: "",
    // Working Professional fields
    organization: "",
    experience: "",
    workLocation: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0); // For progress bar

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  // Update progress dynamically
  useEffect(() => {
    let filled = 0;
    let totalFields = 5; // firstName, lastName, email, phone, role

    if (formData.firstName.trim()) filled++;
    if (formData.lastName.trim()) filled++;
    if (formData.email.trim()) filled++;
    if (formData.phone.trim()) filled++;
    if (formData.role) filled++;

    if (formData.role === "Student") {
      totalFields = 10; // includes student-specific fields
      if (formData.college.trim()) filled++;
      if (formData.degree.trim()) filled++;
      if (formData.branch.trim()) filled++;
      if (formData.passingYear.trim()) filled++;
      if (formData.location.trim()) filled++;
    }

    if (formData.role === "Working Professional") {
      totalFields = 9; // includes professional-specific fields
      if (formData.organization.trim()) filled++;
      if (formData.experience.trim()) filled++;
      if (formData.workLocation.trim()) filled++;
      if (formData.description.trim()) filled++;
    }

    const percent = Math.round((filled / totalFields) * 100);
    setProgress(percent);
  }, [formData]);

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.length < 7)
      newErrors.phone = "Enter a valid phone number";

    if (!formData.role) newErrors.role = "Select your role";

    // Optional LinkedIn validation
    if (formData.linkedIn.trim() && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedIn))
      newErrors.linkedIn = "Enter a valid LinkedIn URL";

    // Role-specific validation
    if (formData.role === "Student") {
      if (!formData.college.trim()) newErrors.college = "College is required";
      if (!formData.degree.trim()) newErrors.degree = "Degree is required";
      if (!formData.branch.trim()) newErrors.branch = "Branch is required";
      if (!formData.passingYear.trim()) newErrors.passingYear = "Passing year is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
    }

    if (formData.role === "Working Professional") {
      if (!formData.organization.trim()) newErrors.organization = "Organization is required";
      if (!formData.experience.trim()) newErrors.experience = "Experience is required";
      if (!formData.workLocation.trim()) newErrors.workLocation = "Location is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Form Submitted Successfully!");
    console.log(formData);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ background: "#1E3A8A", color: "#fff" }}>
        <Modal.Title style={{ fontWeight: "700" }}>
          🔐 Webinar on Cybersecurity
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "#F8FAFC" }}>
        {/* MAIN DESCRIPTION */}
        <div className="mb-4 p-3 rounded" style={{ background: "white", borderLeft: "4px solid #1E3A8A" }}>
          <h4 className="fw-bold text-primary mb-2">🛡 Why This Webinar Matters</h4>
          <p style={{ fontSize: "15px", color: "#444" }}>
            Cyber attacks are increasing daily, and most people don’t realize how easily their phones, passwords, and data can be compromised. This live session will change the way you see cybersecurity forever.
          </p>

          <hr />

          {/* WHAT YOU WILL LEARN */}
          <h5 className="fw-bold text-info mb-2">📘 What You Will Learn</h5>
          <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "18px" }}>
            <li>How hackers think and operate in real-life scenarios</li>
            <li>Cybersecurity vs Ethical Hacking — explained in simple terms</li>
            <li>Understanding malware, botnets, exploits, and digital threats</li>
            <li>Top 5 myths that put 90% of people at risk</li>
            <li>How phishing attacks steal your passwords silently</li>
            <li>Live demo: How OTP bypassing happens through SIM swap</li>
            <li>How to secure your phone & accounts in under 10 minutes</li>
          </ul>

          <hr />

          {/* PERKS */}
          <h5 className="fw-bold text-success mb-2">🎁 Perks You Will Get</h5>
          <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "18px" }}>
            <li>Cybersecurity Roadmap PDF (Beginner → Expert)</li>
            <li>Ethical hacking tool list & commands cheat sheet</li>
            <li>Real phishing detection checklist</li>
            <li>Free access to our cybersecurity community group</li>
            <li>E-certificate of participation (optional)</li>
          </ul>

          <hr />

          {/* LIVE DEMO */}
          <h5 className="fw-bold text-danger mb-2">⚡ Live Demo Highlights</h5>
          <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "18px" }}>
            <li>Watch how hackers create fake login pages</li>
            <li>How URLs are manipulated to steal data</li>
            <li>Simulation: How your password gets captured</li>
            <li>How to instantly detect fake links</li>
          </ul>

          <div style={{
            background: "#E0F2FE",
            color: "#0369A1",
            fontWeight: "600",
            padding: "8px 12px",
            borderRadius: "5px",
            textAlign: "center",
            marginBottom: "15px"
          }}>
            ⏱ Duration: 1 hr 20 mins
          </div>
        </div>

        {/* FORM START */}
        {/* PROGRESS BAR */}
        <ProgressBar now={progress} label={`${progress}%`} className="mb-3" animated />

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><b>First Name</b></Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label><b>Last Name</b></Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><b>Email</b></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label><b>Phone Number</b></Form.Label>
              <PhoneInput
                country={"in"}
                enableSearch
                value={formData.phone}
                onChange={handlePhoneChange}
                inputClass="form-control"
                containerClass="w-100"
                inputStyle={{
                  height: "48px",
                  width: "100%",
                  background: "#fff",
                  border: "1px solid #cacaca",
                  borderRadius: "5px",
                  fontSize: "16px",
                  paddingLeft: "48px",
                }}
              />
              {errors.phone && (
                <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                  {errors.phone}
                </div>
              )}
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label><b>Current Role</b></Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              isInvalid={!!errors.role}
            >
              <option value="">Select role...</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
          </Form.Group>

          {/* LinkedIn URL Field */}
          {/* Dynamic Fields Based on Role */}
          {formData.role === "Student" && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label><b>College</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="college"
                    placeholder="Enter your college"
                    value={formData.college}
                    onChange={handleChange}
                    isInvalid={!!errors.college}
                  />
                  <Form.Control.Feedback type="invalid">{errors.college}</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label><b>Degree</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="degree"
                    placeholder="Enter degree"
                    value={formData.degree}
                    onChange={handleChange}
                    isInvalid={!!errors.degree}
                  />
                  <Form.Control.Feedback type="invalid">{errors.degree}</Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label><b>Branch</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="branch"
                    placeholder="Enter branch"
                    value={formData.branch}
                    onChange={handleChange}
                    isInvalid={!!errors.branch}
                  />
                  <Form.Control.Feedback type="invalid">{errors.branch}</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label><b>Passing Year</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="passingYear"
                    placeholder="Enter passing year"
                    value={formData.passingYear}
                    onChange={handleChange}
                    isInvalid={!!errors.passingYear}
                  />
                  <Form.Control.Feedback type="invalid">{errors.passingYear}</Form.Control.Feedback>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label><b>Location</b></Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                  isInvalid={!!errors.location}
                />
                <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {formData.role === "Working Professional" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label><b>Organization</b></Form.Label>
                <Form.Control
                  type="text"
                  name="organization"
                  placeholder="Enter organization"
                  value={formData.organization}
                  onChange={handleChange}
                  isInvalid={!!errors.organization}
                />
                <Form.Control.Feedback type="invalid">{errors.organization}</Form.Control.Feedback>
              </Form.Group>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label><b>Experience (years)</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    placeholder="Enter experience"
                    value={formData.experience}
                    onChange={handleChange}
                    isInvalid={!!errors.experience}
                  />
                  <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label><b>Location</b></Form.Label>
                  <Form.Control
                    type="text"
                    name="workLocation"
                    placeholder="Enter location"
                    value={formData.workLocation}
                    onChange={handleChange}
                    isInvalid={!!errors.workLocation}
                  />
                  <Form.Control.Feedback type="invalid">{errors.workLocation}</Form.Control.Feedback>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label><b>Description</b></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Brief description about your work"
                  value={formData.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
            <Form.Label><b>LinkedIn Profile (optional)</b></Form.Label>
            <Form.Control
              type="text"
              name="linkedIn"
              placeholder="Enter LinkedIn URL"
              value={formData.linkedIn}
              onChange={handleChange}
              isInvalid={!!errors.linkedIn}
            />
            <Form.Control.Feedback type="invalid">{errors.linkedIn}</Form.Control.Feedback>
          </Form.Group>
            </>
          )}

          {/* BUTTONS */}
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button style={{ background: "#3B82F6", border: "none" }} type="submit">
              Register Now
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationModal;

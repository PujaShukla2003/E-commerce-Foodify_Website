import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "Feedback",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend-only message simulation
    console.log("Message sent:", formData);
    setSubmitted(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      inquiry: "Feedback",
      message: "",
    });

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact" id="contact">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Fill out the form below 👇</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          required
          onChange={handleChange}
        />
        <select
          name="inquiry"
          value={formData.inquiry}
          onChange={handleChange}
          required
        >
          <option value="Feedback">Feedback</option>
          <option value="Support">Support</option>
          <option value="Hire Me">Hire Me</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          required
          onChange={handleChange}
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      {submitted && <p className="success-message">✅ Message Sent Successfully!</p>}
    </div>
  );
};

export default Contact;

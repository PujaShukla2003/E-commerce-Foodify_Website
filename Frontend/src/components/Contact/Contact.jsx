import React, { useState } from "react";
import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // ✅ Web3Forms Access Key
  const WEB3FORMS_ACCESS_KEY = "d357b770-fcf1-43a4-a04a-298e4c5b44ce";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("category", form.category);
    formData.append("message", form.message);
    formData.append(
      "subject",
      `New ${form.category} message from Food Ordering Site`
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", category: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or need help with your order?  
          We’d love to hear from you!
        </p>
      </div>

      <div className="contact-wrapper">
        {/* Left Side: Contact Form */}
        <div className="contact-form-box">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Food Issue">Food Issue</option>
              <option value="Feedback">Feedback / Suggestion</option>
              <option value="Payment Issue">Refund / Payment Issue</option>
            </select>

            <textarea
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="success">✅ Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="error">
                ⚠️ Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>

        {/* Right Side: Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            <FaPhoneAlt /> +91 933496 6286
          </p>
          <p>
            <FaEnvelope /> shuklaarya209@gmail.com
          </p>

          {/* 📍 Clickable Location Icon */}
          <div className="location-icon">
            <a
              href="https://www.google.com/maps/place/Sector+62,+Noida,+Uttar+Pradesh/"
              target="_blank"
              rel="noreferrer"
              title="Click to view our location"
            >
              <FaMapMarkerAlt />
            </a>
            <span>View Location</span>
          </div>

          {/* 🌐 Social Links */}
          <div className="social-links">
            <a href="https://www.facebook.com/share/1EVojKjTSA/" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/pujashukla_2003?utm_source=qr&igsh=MTg0MW52amw1OXZ1dA==" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

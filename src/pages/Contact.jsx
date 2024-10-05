import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import './Contact.css';

const Contact = () => {
  const { backendURL } = useAuth();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/contact`, contact);
      alert('Message sent successfully!');
      setContact({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">References</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          First Names:
          <input
            type="text"
            name="firstname"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="firstname"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
        Relationship:
          <input
            type="text"
            name="relationship"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            name="message"
            value={contact.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Contact Details</button>
      </form>
    </div>
  );
};

export default Contact;

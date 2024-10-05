import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import './PersonalInfo.css';

const PersonalInfo = () => {
  const { backendURL } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    contact: '',
    bio: ''
  });

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await axios.get(`${backendURL}/personal-info`);
        setPersonalInfo(response.data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };
    fetchPersonalInfo();
  }, [backendURL]);

  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendURL}/personal-info`, personalInfo);
      alert('Personal Info updated successfully!');
    } catch (error) {
      console.error('Error updating personal info:', error);
    }
  };

  return (
    <div className="personal-info-container">
      <h1 className="personal-info-title">Personal Information</h1>
      <form onSubmit={handleSubmit} className="personal-info-form">
      <label>
          Title:
          <input
            type="text"
            name="title"
            value={personalInfo.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          First Names:
          <input
            type="text"
            name="firstnames"
            value={personalInfo.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={personalInfo.contact}
            onChange={handleChange}
            required
          />
        </label>
        <label>
        Email:
          <input
            type="text"
            name="email"
            value={personalInfo.contact}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          My time:
          <textarea
            name="mytime"
            value={personalInfo.bio}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PersonalInfo;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import './Education.css';

const Education = () => {
  const { backendURL } = useAuth();
  const [educationList, setEducationList] = useState([]);
  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get(`${backendURL}/education`);
        setEducationList(response.data);
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    };
    fetchEducation();
  }, [backendURL]);

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/education`, education);
      alert('Education added successfully!');
      // Refresh the list
      const response = await axios.get(`${backendURL}/education`);
      setEducationList(response.data);
    } catch (error) {
      console.error('Error adding education:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/education/${id}`);
      alert('Education deleted successfully!');
      // Refresh the list
      const response = await axios.get(`${backendURL}/education`);
      setEducationList(response.data);
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  return (
    <div className="education-container">
      <ul className="education-list">
        {educationList.map((item) => (
          <li key={item._id} className="education-item">
            <h3>{item.degree}</h3>
            <p>{item.institution}</p>
            <p>{item.startDate} - {item.endDate}</p>
            <p>{item.description}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <hr/>
      <h1 className="education-title">Education</h1>
      <form onSubmit={handleSubmit} className="education-form">
        <label>
          Qualifications:
          <input
            type="text"
            name="degree"
            value={education.degree}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Institution:
          <input
            type="text"
            name="institution"
            value={education.institution}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={education.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={education.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={education.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Education</button>
      </form>
    
    </div>
  );
};

export default Education;

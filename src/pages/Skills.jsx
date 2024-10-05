import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import './Skills.css'; // Import the CSS file for Skills

const Skills = () => {
  const { backendURL } = useAuth();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${backendURL}/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [backendURL]);

  return (
    <div className="skills-container">
      <h1 className="skills-title">Skills</h1>
      <ul className="skills-list">
        {skills.map((skill) => (
          <li key={skill._id} className="skills-item">
            <div className="skill-name">{skill.skill}</div>
            <div className="skill-proficiency">{skill.proficiency}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;


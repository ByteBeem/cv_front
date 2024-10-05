import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import './Projects.css';

const Projects = () => {
  const { backendURL } = useAuth();
  const [projectsList, setProjectsList] = useState([]);
  const [project, setProject] = useState({
    title: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendURL}/projects`);
        setProjectsList(response.data);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
    };
    fetchProjects();
  }, [backendURL]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/projects`, project);
      alert('Project added successfully!');
      // Refresh the list
      const response = await axios.get(`${backendURL}/projects`);
      setProjectsList(response.data);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/projects/${id}`);
      alert('Project deleted successfully!');
      // Refresh the list
      const response = await axios.get(`${backendURL}/projects`);
      setProjectsList(response.data);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="projects-container">
       <ul className="projects-list">
        {projectsList.map((item) => (
          <li key={item._id} className="projects-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">View Project</a>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <hr/>
      <div>
      <h1 className="projects-title">Skills</h1>
      <form onSubmit={handleSubmit} className="projects-form">
        <label>
          Names:
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Projects:
          <input
            type="text"
            name="link"
            value={project.link}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Skill</button>
      </form>
      </div>
   
    </div>
  );
};

export default Projects;

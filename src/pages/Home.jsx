import React, { useEffect } from 'react';

import './Home.css'; 
import Typed from 'typed.js';
import about from '../assets/young.jpg'


const Home = () => {

    useEffect(() => {
        const typed = new Typed('.auto-type', {
          strings: ['Welcome to the CV  of Nhlakanipho Eric Shazi!.'],
          typeSpeed: 100,
          backSpeed: 160,
          loop: true
        });

        return () => {
            typed.destroy();
          };
        }, []);

  return (
    <div>
        <div className="home-container">
        <h1 className='before'><span className='auto-type'> </span></h1>
        <p>In Web Development I have an Experience in HTML, CSS, JavaScript, and MySQL. </p>
    </div>
    <div className='container home-about'>
    <div className='row'>
    <div className='col-md-6 about-img'>
    <img src={about} alt=''/>
    </div>
    <div className='col-md-6 second'>
        <p>HI! My name is Nhlakanipho Eric Shazi a student in University of Limpopo, Currently I'm in my first year. Pursuing a degree in Computer Science and Mathematics. </p>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Home;

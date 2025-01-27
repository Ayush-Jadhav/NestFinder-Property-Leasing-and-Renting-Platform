import React, { useState } from 'react';
import './pageStyle/Home.css'; // Assuming you're using a CSS file for styles
import background from '../assets/formBackground1.jpg'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [searchInput,setSearchInput] = useState("");
  const handleChanges = (e)=>{
    setSearchInput(e.target.value);
  }

  const handleSubmit = () => {
    const queryParams = new URLSearchParams({
      searchString: searchInput,
    }).toString();
    
      navigate(`/search?${queryParams}`);
    };

  return (
    <div className="homeContainer">
      <div className="homeContent">
        <h1>Find Your Dream Property</h1>
        <p>Search for properties by area and discover your next home, office, or rental space.</p>
        <div className="searchBar">
          <input
            type="text"
            value = {searchInput}
            placeholder="Enter an area, city, or locality"
            className="searchInput"
            onChange={handleChanges}
          />
          <button className="searchButtonHome" onClick={handleSubmit}>Search</button>
        </div>
      </div>
      <div className='backgroundImg'>
        <img src={background} height={500} width={750} alt=""/>
      </div>
    </div>
  );
};

export default Home;

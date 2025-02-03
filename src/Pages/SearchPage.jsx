import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { nearPropertyEndPoints } from '../Services/api';
import { apiConnector } from '../Services/apiConnector';
import './pageStyle/searchPage.css';
import ReactSlider from 'react-slider';
import PropertyCard from '../Components/PropertyListCard/propertyListCard';

const { SEARCHPROPERTY_API } = nearPropertyEndPoints;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 100000,
    kindOfProperty: "",
    lookingFor: "",
  });

  const queryParams = new URLSearchParams(location.search);
  const searchString = queryParams.get('searchString');
  const [searchText, setSearchText] = useState(searchString);
  const [finalSearch,setFinalSearch] = useState(searchString);

  // Fetch properties based on the search string
  const fetchProperties = async (searchString) => {
    try {
      const response = await apiConnector("GET", `${SEARCHPROPERTY_API}?searchString=${searchString}`);
      setProperties(response.data.properties);
      setFilteredProperties(response.data.properties); // Default to all properties
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(()=>{
    fetchProperties(searchText);
  },[finalSearch])

  // Apply filters to the properties
  useEffect(() => {
    const applyFilters = () => {
      let filtered = properties;

      if (filters.priceMin) {
        filtered = filtered.filter((p) => p.price >= parseFloat(filters.priceMin));
      }
      if (filters.priceMax) {
        filtered = filtered.filter((p) => p.price <= parseFloat(filters.priceMax));
      }
      if (filters.kindOfProperty) {
        filtered = filtered.filter((p) => p.kindOfProperty === filters.kindOfProperty);
      }
      if (filters.lookingFor) {
        filtered = filtered.filter((p) => p.lookingFor === filters.lookingFor);
      }

      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties]);

  // Handle search bar text input change
  const handleSearchBar = (e) => {
    setSearchText(e.target.value);
  };

  // Handle search button click to update the search query in the URL and fetch properties
  const updateSearchString = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("searchString", searchText);
    navigate(`?${searchParams.toString()}`);
    setFinalSearch(searchText);
    fetchProperties(searchText); 
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="search-results-container">
      <div className="search-bar">
        <input
          type="text"
          className="resultant-page-bar"
          value={searchText}
          onChange={handleSearchBar}
          placeholder="Search City, Locality or Sub-locality"
        />
        <button onClick={updateSearchString} className="searchButton">
          Search
        </button>
      </div>

      <div className="content-container">
        <div className="filters-sidebar">
          <h3>Filters</h3>

          <label htmlFor="horizontal-slider">Price</label>
          <ReactSlider
            name="horizontal-slider"
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={0}
            max={100000}
            step={1000}
            value={[filters.priceMin, filters.priceMax]}
            onChange={(values) =>
              setFilters({ ...filters, priceMin: values[0], priceMax: values[1] })
            }
            renderThumb={(props, state) => (
              <div {...props}>
                <div className="slider-value">{state.valueNow}</div>
              </div>
            )}
          />

          <label htmlFor="kindOfProperty">Kind Of Property</label>
          <select
            name="kindOfProperty"
            value={filters.kindOfProperty}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Flat/Apartment">Flat/Apartment</option>
            <option value="Independent House/Villa">Independent House/Villa</option>
            <option value="Serviced Apartment">Serviced Apartment</option>
            <option value="Independent/Builder Floor">Independent/Builder Floor</option>
          </select>

          <label htmlFor="Looking For">Looking For</label>
          <select
            name="lookingFor"
            value={filters.lookingFor}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Sell">Sell</option>
            <option value="Rent/Lease">Rent/Lease</option>
          </select>
        </div>

        <div className="results-section">
          {filteredProperties.length ? (
            <ul>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} dropDown={0} />
              ))}
            </ul>
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

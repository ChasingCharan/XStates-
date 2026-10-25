import { useState, useEffect } from 'react'
import './App.css'
const BASE_URL = "https://location-selector.labs.crio.do";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);  
  const [country, setCountry] = useState("");  
  const [state, setState] = useState("");  
  const [city, setCity] = useState(""); 
  const [error, setError] = useState(null);

  // Load countries on initial render
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/countries`);
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setCountries([]);
        setError('Failed to fetch countries');
      }
    };

    fetchCountries();
  }, []);

  // Load states when country is selected
  useEffect(() => {
    if (country) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`${BASE_URL}/country=${country}/states`);
          const data = await response.json();
          setStates(data);
        } catch (err) {
          setStates([]);
          setError('Failed to fetch states');
        }
      };

      fetchStates();
    }
  }, [country]);

  // Load cities when state is selected
  useEffect(() => {
    if (state) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`${BASE_URL}/country=${country}/state=${state}/cities`);
          const data = await response.json();
          setCities(data);
        } catch (err) {
          setCities([]);
          setError('Failed to fetch cities');
        }
      };

      fetchCities();
    }
  }, [state]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState("");
    setCity("");
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };  


  return (
    <>
      <div className="location-container">
        <h1>Select Location</h1>
        <div className="dropdown-container">
          <select value={country} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {
              countries.map((country)=>(
                <option key={country} value={country}>{country}</option>
              ))
            }
          </select>
          <select value={state} onChange={handleStateChange} disabled={!country}>
            <option value="">Select State</option>
            {
              states.map((state)=>(
                <option key={state} value={state}>{state}</option>
              ))
            }
          </select>
          <select value={city} onChange={handleCityChange} disabled={!state}>
            <option value="">Select City</option>
            {
              cities.map((city)=>(
                <option key={city} value={city}>{city}</option>
              ))
            }
          </select>
        </div>
        {error && <p role="alert" >{error}</p>}
        {city && <p className="selected-location">You selected <strong>{city}</strong>, <span>{state}, {country}</span></p>}
      </div>
    </>
    
  )
}

export default App

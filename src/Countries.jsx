import { useState, useEffect } from "react";
import "./countries.css";
const API_URL = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("Error");
        return;
      } else {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filtered = data.filter((country) => {
      const searchFilter = country.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const regionFilter =
        selectedRegion === "All" || country.region === selectedRegion;

      return searchFilter && regionFilter;
    });

    setFilteredCountries(filtered);
  }, [data, search, selectedRegion]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  return (
    <>
      <header className="header">
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            id="search"
            type="text"
            placeholder="Search for a country.."
            name="search"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="dropdown">
          <select
            value={selectedRegion}
            placeholder="Choose"
            className="dropbtn"
            onChange={handleRegionChange}
          >
            <option value="All" defaultValue={selectedRegion}>
              Filter by region
            </option>
            <option className="dropdown-content" value="Africa">
              Africa
            </option>
            <option className="dropdown-content" value="Americas">
              Americas
            </option>
            <option className="dropdown-content" value="Asia">
              Asia
            </option>
            <option className="dropdown-content" value="Europe">
              Europe
            </option>
            <option className="dropdown-content" value="Oceania">
              Oceania
            </option>
          </select>
        </div>
      </header>
      <section className="section">
        {filteredCountries.map((country) => {
          return (
            <div key={country.name.common} className="card">
              <img className="flag" src={country.flags.png} />
              <h3 id="name">{country.name.common}</h3>
              <p className="text">
                <span>Population : </span>
                {country.population.toLocaleString()}
              </p>
              <p className="text">
                <span>Region : </span>
                {country.region}
              </p>
              <p className="text" id="last-item">
                <span>Capital : </span>
                {country.capital}
              </p>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Countries;

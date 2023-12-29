import { useState, useEffect } from "react";
import "./countries.css";
import EachCountry from "././EachCountry";
const API_URL = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const subRegionData = [];
  const [subRegion, setSubRegion] = useState("All");
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

  data.forEach((item) => {
    if (item.region === selectedRegion) {
      if (!subRegionData.includes(item.subregion)) {
        subRegionData.push(item.subregion);
      }
    }
  });
  const filteredCountries = data.filter((country) => {
    const searchFilter = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionFilter =
      selectedRegion === "All" || country.region === selectedRegion;
    const subRegionFilter =
      subRegion === "All" || country.subregion === subRegion;
    return searchFilter && regionFilter && subRegionFilter;
  });

  // setFilteredCountries(filtered);
  // }, [data, search, selectedRegion]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  const uniqueRegions = data
    .map((item) => item.region)
    .filter((value, index, self) => self.indexOf(value) === index);

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
            placeholder="Choose"
            onChange={(e) => setSubRegion(e.target.value)}
            className="dropbtn"
          >
            <option value={subRegion}>Filter by Subregion</option>
            {subRegionData.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option className="dropdown-content" value={subRegion}></option>
          </select>
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
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </header>
      <EachCountry filteredCountries={filteredCountries} />
    </>
  );
};

export default Countries;

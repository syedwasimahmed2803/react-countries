import { useState, useEffect } from "react";
import "./countries.css";
import EachCountry from "././EachCountry";
const API_URL = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const [subRegion, setSubRegion] = useState("All");
  const [population, setPopulation] = useState("All");
  const [area, setArea] = useState("");
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
  const subRegionData = [];
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSubRegion("All");
  };
  const uniqueRegions = data
    .map((item) => item.region)
    .filter((value, index, self) => self.indexOf(value) === index);

  const handlePopulationSorting = (e) => {
    setPopulation(e.target.value);
    if (population === "ascending") {
      filteredCountries.sort((a, b) => a.population - b.population);
    } else if (population === "descending") {
      filteredCountries.sort((a, b) => b.population - a.population);
    }
    setArea("All");
  };
  const handleAreaSorting = (e) => {
    setArea(e.target.value);
    if (area === "ascending") {
      filteredCountries.sort((a, b) => a.area - b.area);
    } else if (population === "descending") {
      filteredCountries.sort((a, b) => b.area - a.area);
    }
    setPopulation("All");
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
            placeholder="Choose"
            onChange={(e) => handleAreaSorting(e)}
            className="dropbtn"
            value={area}
          >
            <option value="All">Sort by Area</option>

            <option className="dropdown-content" value="ascending">
              ascending
            </option>

            <option className="dropdown-content" value="descending">
              descending
            </option>
          </select>
        </div>
        <div className="dropdown">
          <select
            placeholder="Choose"
            onChange={(e) => handlePopulationSorting(e)}
            className="dropbtn"
            value={population}
          >
            <option value="All">Sort by Population</option>

            <option className="dropdown-content" value="ascending">
              ascending
            </option>

            <option className="dropdown-content" value="descending">
              descending
            </option>
          </select>
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
          </select>
        </div>

        <div className="dropdown">
          <select
            value={selectedRegion}
            placeholder="Choose"
            className="dropbtn"
            onChange={(e) => handleRegionChange(e)}
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

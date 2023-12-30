import { useState } from "react";
import Cards from "./Cards";
import "./Header.css";
const Header = ({ data }) => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedSubRegion, setSelectedSubRegion] = useState("All");
  const [selectedPopulationOrder, setSelectedPopulationOrder] = useState("");
  const [selectedAreaOrder, setSelectedAreaOrder] = useState("");
  const subRegionData = [];

  const filteredCountries = data.filter((country) => {
    const searchFilter = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const regionFilter =
      selectedRegion === "All" || country.region === selectedRegion;
    const subRegionFilter =
      selectedSubRegion === "All" || country.subregion === selectedSubRegion;
    return searchFilter && regionFilter && subRegionFilter;
  });
  const uniqueRegions = data
    .map((item) => item.region)
    .filter((value, index, self) => self.indexOf(value) === index);
  data.forEach((item) => {
    if (item.region === selectedRegion) {
      if (!subRegionData.includes(item.subregion)) {
        subRegionData.push(item.subregion);
      }
    }
  });
  if (selectedPopulationOrder === "ascending") {
    filteredCountries.sort((a, b) => a.population - b.population);
  } else if (selectedPopulationOrder === "descending") {
    filteredCountries.sort((a, b) => b.population - a.population);
  }
  if (selectedAreaOrder === "ascending") {
    filteredCountries.sort((a, b) => a.area - b.area);
  } else if (selectedAreaOrder === "descending") {
    filteredCountries.sort((a, b) => b.area - a.area);
  }
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <select
            placeholder="Choose"
            onChange={(e) => {
              setSelectedAreaOrder(e.target.value);
              setSelectedPopulationOrder("");
            }}
            className="dropbtn"
            value={selectedAreaOrder}
          >
            <option value="">Sort by Area</option>

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
            onChange={(e) => {
              setSelectedPopulationOrder(e.target.value);
              setSelectedAreaOrder("");
            }}
            className="dropbtn"
            value={selectedPopulationOrder}
          >
            <option value="">Sort by Population</option>

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
            value={selectedSubRegion}
            placeholder="Choose"
            onChange={(e) => setSelectedSubRegion(e.target.value)}
            className="dropbtn"
          >
            <option defaultValue={selectedSubRegion} value="All">
              Filter by Subregion
            </option>
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
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedSubRegion("All");
            }}
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
      <Cards data={filteredCountries} />
    </>
  );
};

export default Header;

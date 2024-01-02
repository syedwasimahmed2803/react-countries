import { useState } from "react";
import Cards from "./Cards";
import "./FeatureSelection.css";
import Dropdown from "./Dropdown";
const FeatureSelection = ({ data }) => {
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

        <Dropdown
          options={["ascending", "descending"]}
          value={selectedAreaOrder}
          onChange={(e) => {
            setSelectedAreaOrder(e.target.value);
            setSelectedPopulationOrder("");
          }}
          placeholder="Sort by Area"
        />

        <Dropdown
          options={["ascending", "descending"]}
          value={selectedPopulationOrder}
          onChange={(e) => {
            setSelectedPopulationOrder(e.target.value);
            setSelectedAreaOrder("");
          }}
          placeholder="Sort by Population"
        />

        <Dropdown
          options={subRegionData}
          value={selectedSubRegion}
          onChange={(e) => setSelectedSubRegion(e.target.value)}
          placeholder="Filter by Subregion"
        />

        <Dropdown
          options={uniqueRegions}
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            setSelectedSubRegion("All");
          }}
          placeholder="Filter by Region"
        />
      </header>
      <Cards data={filteredCountries} search={search} />
    </>
  );
};

export default FeatureSelection;

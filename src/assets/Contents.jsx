import { useState, useEffect } from "react";
const API_URL = "https://restcountries.com/v3.1/all";
import FeatureSelection from "./FeatureSelection";
import { Routes, Route } from "react-router-dom";
import CountryDetail from "./CountryDetail";
import Error from "./Error";
const Contents = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("Error fetching data");
        return;
      }
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const codes = data.reduce((acc, curr) => {
    acc[curr.cca3] = curr.name.common;
    return acc;
  }, {});
  return (
    <>
      <Routes>
        <Route path="/" element={<FeatureSelection data={data} />}></Route>
        <Route
          path="/country/:id"
          element={<CountryDetail names={codes} />}
        ></Route>
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Contents;

import { useState, useEffect } from "react";
const API_URL = "https://restcountries.com/v3.1/all";
import Header from "./Header";
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
  return (
    <>
      <Header data={data} />
    </>
  );
};

export default Contents;

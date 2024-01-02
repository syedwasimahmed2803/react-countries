import { Link, useParams } from "react-router-dom";
import "./CountryDetails.css";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
const CountryDetail = ({ names }) => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const API_URL = `https://restcountries.com/v3.1/alpha/${id}`;
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
      <Link to="/">
        <button className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>Back
        </button>
      </Link>
      {data.length ? (
        data.map((item) => {
          return (
            <>
              <div className="countryContainer">
                <div className="imageContainer">
                  <img src={item.flags.png} alt="" className="flagImg" />
                </div>
                <div className="countryDetails">
                  <h1>{item.name.common}</h1>
                  <div className="gridContainer">
                    <div className="grid-left">
                      <p className="details-items">
                        <span className="details-items">Native Name:</span>
                        {item.name.nativeName
                          ? Object.keys(item.name.nativeName)
                              .map(
                                (native) => item.name.nativeName[native].common
                              )
                              .join(",")
                          : " "}
                      </p>
                      <p className="details-items">
                        <span className="details-items">Population:</span>
                        {item.population.toLocaleString()}
                      </p>
                      <p className="details-items">
                        <span className="details-items">Region:</span>
                        {item.region}
                      </p>
                      <p className="details-items">
                        <span className="details-items">Sub Region:</span>
                        {item.subregion}
                      </p>
                      <p className="details-items">
                        <span className="details-items">Capital:</span>
                        {item.capital}
                      </p>
                    </div>
                    <div className="grid-right">
                      <p className="details-items">
                        <span className="details-items">Top Level Domain:</span>
                        {item.tld}
                      </p>
                      <p className="details-items">
                        <span className="details-items">Currencies:</span>
                        {item.currencies
                          ? Object.keys(item.currencies)
                              .map((cur) => {
                                return item.currencies[cur].name;
                              })
                              .join(",")
                          : " "}
                      </p>
                      <p className="details-items">
                        <span className="details-items">Languages:</span>
                        {Object.keys(item.languages)
                          .map((lang) => {
                            return item.languages[lang];
                          })
                          .join(",")}
                      </p>
                    </div>
                    <div className="grid-bottom">
                      <p>
                        <span>Border Countries: </span>
                        {item.borders
                          ? Object.keys(item.borders).map((bor) => {
                              return (
                                <button>{names[item.borders[bor]]}</button>
                              );
                            })
                          : "No Border Countries Found"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </>
  );
};

export default CountryDetail;

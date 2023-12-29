import { ThreeDots } from "react-loader-spinner";

const EachCountry = ({ filteredCountries }) => {
  return (
    <section className="section">
      {filteredCountries.length ? (
        filteredCountries.map((country) => (
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
        ))
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
    </section>
  );
};

export default EachCountry;

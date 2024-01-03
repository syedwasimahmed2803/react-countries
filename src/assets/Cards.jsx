import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Cards = ({ data, search }) => {
  return (
    <section className="section">
      {data.length ? (
        data.map((country) => (
          <Link
            key={`${country.ccn3}`}
            to={`/country/${country.ccn3}`}
            style={{
              textDecoration: "none",
              color: "var(--Very-Dark-Blue-Light-mode)",
            }}
          >
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
          </Link>
        ))
      ) : !search ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
          }}
        >
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#000000"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <h2>No Such Countries found........</h2>
      )}{" "}
    </section>
  );
};

export default Cards;

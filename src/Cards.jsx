const Cards = ({ data }) => {
  return (
    <section className="section">
      {data.map((country) => (
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
      ))}
    </section>
  );
};

export default Cards;

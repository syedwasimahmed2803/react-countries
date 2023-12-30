import "./nav.css";
import "@fortawesome/fontawesome-free/css/all.css";
const Nav = () => {
  return (
    <nav>
      <h1 className="header-text">Where in the world?</h1>
      <div className="toggle">
        <i className="fa-regular fa-moon"></i>
        <p id="mode">Dark Mode</p>
      </div>
    </nav>
  );
};

export default Nav;

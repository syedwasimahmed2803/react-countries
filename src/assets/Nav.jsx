import "./nav.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useContext, useState } from "react";
import { ThemeContext } from "../App";
const Nav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [color, setColor] = useState("Dark Mode");
  const changeText = () => {
    if (color === "Dark Mode") {
      setColor("Light Mode");
    } else {
      setColor("Dark Mode");
    }
  };
  return (
    <nav>
      <h1 className="header-text">Where in the world?</h1>
      <div
        onClick={() => {
          toggleTheme();
          changeText();
        }}
        className="toggle"
      >
        <i className="fa-regular fa-moon"></i>
        <p id="mode">{color}</p>
      </div>
    </nav>
  );
};

export default Nav;

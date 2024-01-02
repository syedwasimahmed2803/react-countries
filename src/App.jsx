import "./App.css";
import Contents from "./assets/Contents";
import Nav from "./assets/Nav";
import { useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";

export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <div
          className="
    App"
          id={theme}
        >
          <Nav />
          <Contents />
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;

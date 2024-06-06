import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.jpg";
import "./style.css";

function Navbar() {
  const location = useLocation();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "English";
    setLanguage(storedLanguage);
  }, []);

  const handleLogout = () => {
    // Clear relevant items from local storage
    localStorage.removeItem("udiseNumber");
    localStorage.removeItem("language");
  };

  return (
    <div className="Navbar fixed-top">
      <div className="leftSide">
        <img className="rounded-circle" src={Logo} alt="School Logo" />
      </div>

      <div className="rightSide">
        {location.pathname !== "/school-register" && location.pathname !== "/loginform" && (
          <a href="/loginform" onClick={handleLogout}>
            {language === "English" ? "Log Out" : "लॉग आउट"}
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAboutClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer id="footer" className="w-full">
      <div className="container py-6 mx-auto px-2">
        <div className="flex flex-wrap items-center">
          {/* Copyright */}
          <div className="w-full text-center">
            <div className="copyright">
              &copy; Copyright 2025 <strong>KERIS</strong>. All Rights Reserved
            </div>
          </div>
          {/* Footer Links */}
          <div className="w-full">
            <nav className="footer-links text-center pt-2">
              <Link
                to="/"
                onClick={handleHomeClick}
                className="px-3 hover:text-white cursor-pointer transition font-medium"
              >
                Home
              </Link>
              <Link
                to="/#about"
                onClick={handleAboutClick}
                className="px-3 hover:text-white cursor-pointer transition font-medium"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

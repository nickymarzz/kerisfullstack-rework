import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
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
              <NavLink to="/" className="scrollto px-2">
                Home
              </NavLink>
              <NavLink to="/#about" className="scrollto px-2">
                About
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

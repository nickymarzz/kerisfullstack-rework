import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [mobileDropdownActive, setMobileDropdownActive] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavActive(!mobileNavActive);
    setMobileDropdownActive(false); // Close dropdown when toggling nav
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownActive(!mobileDropdownActive);
  };

  return (
    <header
      id="header"
      className="left-0 right-0 flex items-center bg-transparent z-50"
    >
      <div className="w-full md:flex justify-between md:mx-6 lg:mx-auto mx-4 lg:px-10 flex items-center">
        {/* Logo */}
        <div className="logo">
          <h1 className="text-white">
            <Link to="/">
              <span>KERIS</span>
            </Link>
          </h1>
        </div>

        {/* Desktop Navbar */}
        <nav className="nav-menu hidden md:block text-white">
          <ul className="flex space-x-8">
            <li>
              <a href="#about" className="hover:text-opacity-80 transition">
                About
              </a>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-opacity-80 transition">
                Resources
              </span>
              <ul className="absolute hidden group-hover:block bg-[#F16767] p-2 rounded shadow-lg min-w-[200px] z-50">
                <li>
                  <NavLink
                    to="/scholar"
                    className="block p-2 hover:bg-gray-100 hover:text-gray-900 hover:rounded"
                  >
                    Meet Your Scholars
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/scholarship"
                    className="block p-2 hover:bg-gray-100 hover:text-gray-900 hover:rounded"
                  >
                    Scholarship Status
                  </NavLink>
                </li>
                <li>
                  <a
                    className="block p-2 hover:bg-gray-100 hover:text-gray-900 hover:rounded"
                    href="https://drive.google.com/drive/folders/1nEYxi9TDSJqKcg304CggB9o2FfurIg_l?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Essay Repository
                  </a>
                </li>
                <li>
                  <a
                    className="block p-2 hover:bg-gray-100 hover:text-gray-900 hover:rounded"
                    href="https://drive.google.com/drive/folders/1qlGAclESRxLpnt5gZbZzXYVkyayEuLfb?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume Template
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#faq" className="hover:text-opacity-80 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-opacity-80 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="mobile-nav-toggle md:hidden text-white text-3xl focus:outline-none z-50"
          onClick={toggleMobileNav}
        >
          <i className={mobileNavActive ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center text-white transition-transform duration-300 ${
          mobileNavActive ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <a href="#about" className="text-xl py-2" onClick={toggleMobileNav}>
          About
        </a>

        {/* Mobile Dropdown Toggle */}
        <div className="text-xl py-2 cursor-pointer flex flex-col items-center">
          <div className="flex items-center" onClick={toggleMobileDropdown}>
            <span>Resources</span>
            <i
              className={`ml-2 transition-transform duration-300 ${
                mobileDropdownActive ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </i>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out ${
              mobileDropdownActive
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <NavLink to="/scholar" onClick={toggleMobileNav}>
              <p className="py-2 text-lg">Meet Your Scholars</p>
            </NavLink>
            <NavLink to="/scholarship" onClick={toggleMobileNav}>
              <p className="py-2 text-lg">Scholarship Status</p>
            </NavLink>
            <a href="https://drive.google.com/drive/folders/1nEYxi9TDSJqKcg304CggB9o2FfurIg_l?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={toggleMobileNav}>
              <p className="py-2 text-lg">Essay Repository</p>
            </a>
            <a href="https://drive.google.com/drive/folders/1qlGAclESRxLpnt5gZbZzXYVkyayEuLfb?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={toggleMobileNav}>
              <p className="py-2 text-lg">Resume Template</p>
            </a>
          </div>
        </div>

        <a href="#faq" className="text-xl py-2" onClick={toggleMobileNav}>
          FAQ
        </a>
        <a href="#contact" className="text-xl py-2" onClick={toggleMobileNav}>
          Contact Us
        </a>
      </div>
    </header>
  );
}

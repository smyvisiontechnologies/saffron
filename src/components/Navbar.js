import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo / Brand */}
          <a href="/" className="nav-logo">
            🌿 Saffron Co.
          </a>

          {/* Hamburger icon for mobile */}
          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Navigation links */}
          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link" onClick={toggleMenu}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/products" className="nav-link" onClick={toggleMenu}>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link" onClick={toggleMenu}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Inline styles for simplicity – you can move these to a separate CSS file */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar {
          background-color: #FF9933;  /* Saffron color */
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          position: sticky;
          top: 0;
          z-index: 999;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          padding: 0 20px;
        }

        .nav-logo {
          color: #fff;
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        .nav-item {
          height: 70px;
          display: flex;
          align-items: center;
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
          padding: 0 1rem;
          height: 100%;
          display: flex;
          align-items: center;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          border-bottom: 3px solid #fff;
          background-color: rgba(255, 255, 255, 0.1);
        }

        /* Hamburger menu styles */
        .nav-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }

        .bar {
          width: 25px;
          height: 3px;
          background-color: #fff;
          margin: 3px 0;
          transition: 0.3s;
        }

        /* Responsive styles */
        @media screen and (max-width: 768px) {
          .nav-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            position: absolute;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background-color: #FF9933;
            transition: left 0.3s ease;
            padding-top: 20px;
            gap: 0;
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-item {
            width: 100%;
            height: auto;
            margin: 10px 0;
          }

          .nav-link {
            width: 100%;
            justify-content: center;
            padding: 15px 0;
          }

          .nav-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
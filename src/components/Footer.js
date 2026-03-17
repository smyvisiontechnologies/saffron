import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-logo">🌿 Saffron Co.</h3>
            <p className="footer-description">
              Bringing the finest Kashmiri saffron to your kitchen. Pure, organic, and ethically sourced.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Get in Touch</h4>
            <ul className="footer-contact">
              <li>📍 Mangalagiri, Andhra Pradesh 522503</li>
              <li>📞 +91 8500352005</li>
              <li>✉️ hello@saffronco.com</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span role="img" aria-hidden="true">📘</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span role="img" aria-hidden="true">📷</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span role="img" aria-hidden="true">🐦</span>
              </a>
              <a href="https://wa.me/918500352005" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <span role="img" aria-hidden="true">💬</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Saffron Co. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .footer {
          background-color: #222;
          color: #f0f0f0;
          padding: 40px 20px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
        }

        .footer-section h3,
        .footer-section h4 {
          color: #FF9933; /* Saffron */
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .footer-logo {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .footer-description {
          line-height: 1.6;
          color: #ccc;
        }

        .footer-links,
        .footer-contact {
          list-style: none;
          padding: 0;
        }

        .footer-links li,
        .footer-contact li {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: #f0f0f0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #FF9933;
        }

        .footer-contact li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ccc;
        }

        .footer-social {
          display: flex;
          gap: 15px;
        }

        .footer-social a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #333;
          border-radius: 50%;
          color: #FF9933;
          font-size: 1.5rem;
          text-decoration: none;
          transition: background-color 0.3s, color 0.3s;
        }

        .footer-social a:hover {
          background-color: #FF9933;
          color: #222;
        }

        .footer-bottom {
          text-align: center;
          border-top: 1px solid #444;
          margin-top: 40px;
          padding-top: 20px;
          color: #aaa;
          font-size: 0.9rem;
        }

        /* Responsive */
        @media screen and (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-social {
            justify-content: center;
          }

          .footer-contact li {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
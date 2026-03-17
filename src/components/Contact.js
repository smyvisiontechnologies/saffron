import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Construct WhatsApp message
    const whatsappMessage = `*New Contact Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;

    // WhatsApp number (with India country code)
    const whatsappUrl = `https://wa.me/918500352005?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    // Optionally reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <main className="contact">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Reach out with any questions or inquiries.</p>
          </div>
        </section>

        <div className="container">
          {/* Contact Information Cards */}
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>
                Saffron Co. Headquarters<br />
                Mangalagiri Town Center<br />
                Andhra Pradesh, India - 522503
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>+91 8500352005</p>
              <p>Mon - Sat, 9am - 6pm</p>
            </div>
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email Us</h3>
              <p>hello@saffronco.com</p>
              <p>support@saffronco.com</p>
            </div>
          </div>

          {/* Map & Social Section */}
          <div className="map-social">
            <div className="map-container">
              <h2>Our Location in Mangalagiri</h2>
              <div className="map-wrapper">
                <iframe
                  title="Mangalagiri Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.229391489316!2d80.54348231474653!3d16.43623998864163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0b0b0b0b0b%3A0x6e8a3b7c7f7f7f7f!2sMangalagiri%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1647890123456!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="social-section">
              <h2>Follow Us</h2>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <span role="img" aria-label="Facebook">📘</span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <span role="img" aria-label="Instagram">📷</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <span role="img" aria-label="Twitter">🐦</span>
                </a>
                <a href="https://wa.me/918500352005" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <span role="img" aria-label="WhatsApp">💬</span>
                </a>
              </div>
              <p className="social-note">Connect with us on social media for updates and offers!</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">Send via WhatsApp</button>
            </form>
          </div>
        </div>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #fef7e9;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .contact-hero {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
            no-repeat center center/cover;
          height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          margin-bottom: 60px;
        }

        .contact-hero .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .contact-hero .hero-content p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Info Cards */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .info-card {
          background-color: #fff;
          padding: 30px 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-10px);
        }

        .info-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .info-card h3 {
          font-size: 1.5rem;
          color: #b85e00;
          margin-bottom: 15px;
        }

        .info-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Map & Social Section */
        .map-social {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .map-container h2,
        .social-section h2 {
          font-size: 2rem;
          color: #b85e00;
          margin-bottom: 20px;
        }

        .map-wrapper {
          width: 100%;
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .map-wrapper iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .social-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background-color: #FF9933;
          color: #fff;
          border-radius: 50%;
          font-size: 2rem;
          text-decoration: none;
          transition: background-color 0.3s, transform 0.3s;
        }

        .social-icon:hover {
          background-color: #e67300;
          transform: scale(1.1);
        }

        .social-note {
          color: #666;
          font-style: italic;
        }

        /* Contact Form */
        .form-section {
          background-color: #fff;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 60px;
        }

        .form-section h2 {
          font-size: 2rem;
          color: #b85e00;
          margin-bottom: 30px;
          text-align: center;
        }

        .contact-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #FF9933;
        }

        .submit-btn {
          background-color: #FF9933;
          color: #fff;
          border: none;
          padding: 12px 30px;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          width: 100%;
        }

        .submit-btn:hover {
          background-color: #e67300;
        }

        /* Responsive */
        @media screen and (max-width: 768px) {
          .contact-hero {
            height: 30vh;
          }

          .contact-hero .hero-content h1 {
            font-size: 2.2rem;
          }

          .contact-hero .hero-content p {
            font-size: 1rem;
          }

          .map-social {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .map-wrapper {
            height: 250px;
          }

          .form-section {
            padding: 20px;
          }
        }

        @media screen and (max-width: 480px) {
          .info-cards {
            grid-template-columns: 1fr;
          }

          .social-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;
import React from 'react';

const Home = () => {
  return (
    <>
      <main className="home">
        {/* Hero Section with Video Background */}
        <section className="hero">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="hero-video"
          >
            <source src="/videos/saffron.mp4" type="video/mp4" />
            {/* Add fallback for browsers that don't support video */}
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Premium Saffron from the Valleys of Kashmir</h1>
            <p>
              Experience the rich aroma, vibrant color, and unparalleled quality of
              our handpicked saffron. Pure, natural, and delivered fresh to your door.
            </p>
            <a href="/products" className="cta-button">
              Explore Our Collection
            </a>
          </div>
        </section>

        {/* Intro Section */}
        <section className="intro">
          <div className="container">
            <h2>Why Our Saffron?</h2>
            <p>
              For generations, we have cultivated the finest saffron using traditional
              methods. Every strand is carefully harvested to preserve its potency and
              flavor. Whether you're a chef, a home cook, or a wellness enthusiast,
              our saffron will elevate your creations.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>100% Pure</h3>
              <p>No additives or preservatives – just pure saffron threads.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Grade A++</h3>
              <p>Highest quality with deep red color and strong aroma.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Worldwide Shipping</h3>
              <p>Fast and reliable delivery to your doorstep.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to add the golden touch to your dishes?</h2>
            <a href="/products" className="cta-button secondary">
              Shop Now
            </a>
          </div>
        </section>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section with Video */
        .hero {
          position: relative;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          overflow: hidden;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 20px;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-block;
          background-color: #FF9933; /* Saffron */
          color: #fff;
          padding: 12px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: bold;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .cta-button:hover {
          background-color: #e67300; /* Darker saffron */
        }

        .cta-button.secondary {
          background-color: transparent;
          border: 2px solid #FF9933;
          color: #FF9933;
        }

        .cta-button.secondary:hover {
          background-color: #FF9933;
          color: #fff;
        }

        /* Intro Section */
        .intro {
          padding: 80px 0;
          background-color: #fef7e9;
          text-align: center;
        }

        .intro h2 {
          font-size: 2.5rem;
          color: #b85e00;
          margin-bottom: 20px;
        }

        .intro p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.8;
          color: #555;
        }

        /* Features Section */
        .features {
          padding: 80px 0;
          background-color: #fff;
        }

        .features .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }

        .feature-card {
          background-color: #fef7e9;
          border-radius: 10px;
          padding: 40px 20px;
          text-align: center;
          flex: 1 1 300px;
          max-width: 350px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          color: #b85e00;
          margin-bottom: 15px;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Call to Action Section */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
            no-repeat center center/cover;
          text-align: center;
          color: #fff;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
        }

        /* Responsive adjustments */
        @media screen and (max-width: 768px) {
          .hero h1 {
            font-size: 2.2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .intro h2,
          .cta-section h2 {
            font-size: 2rem;
          }

          .intro p {
            font-size: 1rem;
          }

          .feature-card {
            max-width: 100%;
          }
        }

        @media screen and (max-width: 480px) {
          .hero {
            height: 70vh;
          }

          .hero h1 {
            font-size: 1.8rem;
          }

          .cta-button {
            padding: 10px 20px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
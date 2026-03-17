import React from 'react';

const About = () => {
  return (
    <>
      <main className="about">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>Our Story</h1>
            <p>
              From the lush valleys of Kashmir to your kitchen – a journey of passion,
              tradition, and unparalleled quality.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <div className="container">
            <div className="mission-text">
              <h2>Bringing the Golden Spice to the World</h2>
              <p>
                For over three decades, our family has cultivated saffron using
                time‑honored methods passed down through generations. We believe that
                true saffron is more than just a spice – it's an experience. From the
                moment the flowers bloom to the final packaging, every step is handled
                with care to preserve the delicate threads' aroma, color, and potency.
              </p>
              <p>
                Our mission is to share the rich heritage and unparalleled quality of
                Kashmiri saffron with the world, while supporting local farmers and
                sustainable practices.
              </p>
            </div>
            <div className="mission-image">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Saffron fields in Kashmir"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values">
          <div className="container">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🌿</div>
                <h3>Purity</h3>
                <p>
                  100% pure saffron with no additives, dyes, or bulking agents.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Integrity</h3>
                <p>
                  Honest sourcing, fair trade practices, and transparent processes.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">🌍</div>
                <h3>Sustainability</h3>
                <p>
                  Environmentally friendly farming that respects the land and future
                  generations.
                </p>
              </div>
              <div className="value-card">
                <div className="value-icon">❤️</div>
                <h3>Passion</h3>
                <p>
                  A deep love for our craft that shines through in every strand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team">
          <div className="container">
            <h2>Meet the Keepers of the Tradition</h2>
            <div className="team-grid">
              <div className="team-member">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="Founder"
                />
                <h3>Rajesh Kumar</h3>
                <p>Founder & Master Farmer</p>
              </div>
              <div className="team-member">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="Co-founder"
                />
                <h3>Sharma</h3>
                <p>Co-founder & Quality Director</p>
              </div>
              <div className="team-member">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="Head of Operations"
                />
                <h3>Vikram Singh</h3>
                <p>Head of Operations</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .about-hero {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')
            no-repeat center center/cover;
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
        }

        .about-hero .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .about-hero .hero-content p {
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Mission Section */
        .mission {
          padding: 80px 0;
          background-color: #fef7e9;
        }

        .mission .container {
          display: flex;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .mission-text {
          flex: 1 1 400px;
        }

        .mission-text h2 {
          font-size: 2.5rem;
          color: #b85e00;
          margin-bottom: 20px;
        }

        .mission-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 20px;
          color: #555;
        }

        .mission-image {
          flex: 1 1 400px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .mission-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .mission-image img:hover {
          transform: scale(1.03);
        }

        /* Values Section */
        .values {
          padding: 80px 0;
          background-color: #fff;
          text-align: center;
        }

        .values h2 {
          font-size: 2.5rem;
          color: #b85e00;
          margin-bottom: 50px;
        }

        .values-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }

        .value-card {
          background-color: #fef7e9;
          border-radius: 10px;
          padding: 40px 20px;
          flex: 1 1 200px;
          max-width: 250px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-10px);
        }

        .value-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 1.5rem;
          color: #b85e00;
          margin-bottom: 15px;
        }

        .value-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Team Section */
        .team {
          padding: 80px 0;
          background-color: #fef7e9;
          text-align: center;
        }

        .team h2 {
          font-size: 2.5rem;
          color: #b85e00;
          margin-bottom: 50px;
        }

        .team-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
        }

        .team-member {
          flex: 1 1 250px;
          max-width: 300px;
        }

        .team-member img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #FF9933;
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }

        .team-member img:hover {
          transform: scale(1.05);
        }

        .team-member h3 {
          font-size: 1.5rem;
          color: #b85e00;
          margin-bottom: 5px;
        }

        .team-member p {
          color: #666;
          font-style: italic;
        }

        /* Responsive */
        @media screen and (max-width: 768px) {
          .about-hero .hero-content h1 {
            font-size: 2.5rem;
          }

          .about-hero .hero-content p {
            font-size: 1rem;
          }

          .mission .container {
            flex-direction: column;
          }

          .mission-text {
            text-align: center;
          }

          .mission-text h2 {
            font-size: 2rem;
          }

          .values h2,
          .team h2 {
            font-size: 2rem;
          }

          .value-card {
            max-width: 100%;
          }

          .team-member img {
            width: 120px;
            height: 120px;
          }
        }

        @media screen and (max-width: 480px) {
          .about-hero {
            height: 50vh;
          }

          .about-hero .hero-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default About;
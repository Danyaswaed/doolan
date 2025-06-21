import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import CircularGallery from '../../components/CircularGallery/CircularGallery';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    const fetchAttractions = fetch('http://localhost:5000/uploads/attractions').then(res => res.json());
    const fetchCamping = fetch('http://localhost:5000/uploads/camping').then(res => res.json());

    Promise.all([fetchAttractions, fetchCamping])
      .then(([attractions, camping]) => {
        const attractionItems = attractions
          .filter(attraction => attraction.image)
          .map(attraction => ({
            image: `http://localhost:5000/uploads/attractions/${attraction.image}`,
            text: attraction.name || "Attraction",
            description: attraction.description || ""
          }));

        const campingItems = camping
          .filter(spot => spot.image)
          .map(spot => ({
            image: `http://localhost:5000/uploads/camping/${spot.image}`,
            text: spot.name || "Camping Spot",
            description: spot.description || "",
          }));

        setGalleryItems([...attractionItems, ...campingItems]);
        setIsLoading(false);
      })
      .catch(error => {
        setError("Error fetching data");
        setIsLoading(false);
      });

    // Add scroll animations
    gsap.to('.home-container', {
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true
      },
      ease: 'none'
    });
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeHeading}>Welcome to DO OlaNya Trips</h1>
          <p className={styles.welcomeText}>
            Discover the beauty of Israel through our adventures and tours
          </p>
          <Link to="/explore" className={styles.exploreButton}>
            Explore Now
          </Link>
        </div>
      </section>

      {/* Circular Gallery */}
      <section className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>Featured Destinations</h2>
        <CircularGallery
          bend={1.2}
          textColor="#ffffff"
          borderRadius={0.05}
          items={galleryItems}
        />
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Explore by Category</h2>
        <div className={styles.categoriesGrid}>
          <div className={styles.categoryCard}>
            <i className="fas fa-mountain"></i>
            <h3>Hiking</h3>
            <p>Discover breathtaking trails</p>
          </div>
          <div className={styles.categoryCard}>
            <i className="fas fa-campground"></i>
            <h3>Camping</h3>
            <p>Experience nature's beauty</p>
          </div>
          <div className={styles.categoryCard}>
            <i className="fas fa-tree"></i>
            <h3>Attractions</h3>
            <p>Visit iconic sites</p>
          </div>
          <div className={styles.categoryCard}>
            <i className="fas fa-gift"></i>
            <h3>Surprise</h3>
            <p>Let us surprise you</p>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className={styles.recommendationsSection}>
        <h2 className={styles.sectionTitle}>Our Recommendations</h2>
        <div className={styles.recommendationsGrid}>
          {galleryItems.slice(0, 4).map((item, index) => (
            <div key={index} className={styles.recommendationCard}>
              <img 
                src={item.image} 
                alt={item.text}
                className={styles.recommendationImage}
              />
              <div className={styles.recommendationContent}>
                <h3 className={styles.recommendationTitle}>{item.text}</h3>
                <p className={styles.recommendationDescription}>
                  {item.description && item.description.length > 100 
                    ? item.description.slice(0, 100) + '...'
                    : item.description}
                </p>
                <Link to={`/destination/${index}`} className={styles.recommendationButton}>
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surprise Trip Section */}
      <section className={styles.surpriseTripSection}>
        <div className={styles.surpriseTripContent}>
          <h2 className={styles.surpriseTripTitle}>Surprise Trip</h2>
          <p className={styles.surpriseTripText}>
            Looking for a spontaneous adventure? Choose your preferences and we'll take care of the rest. 
            You won't know your destination until you arrive!
          </p>
          <Link to="/surprise-trip" className={styles.surpriseTripButton}>
            Plan My Surprise Trip
          </Link>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className={styles.signUpSection}>
        <div className={styles.signUpContent}>
          <h2 className={styles.signUpTitle}>Join Our Community</h2>
          <p className={styles.signUpText}>
            Not a member yet? Join our travel community and start discovering the hidden gems of Israel.
          </p>
          <Link to="/signup" className={styles.signUpButton}>
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Journey Gallery Section */}
      <section className={styles.journeyGallery}>
        <h2 className={styles.journeyGalleryTitle}>Join the Journey</h2>
        <div className={styles.journeyGrid}>
          {galleryItems.slice(0, 4).map((item, index) => (
            <div key={index} className={styles.journeyCard}>
              <img 
                src={item.image} 
                alt={item.text}
                className={styles.journeyImage}
              />
              <div className={styles.journeyOverlay}>
                <p className={styles.journeyText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Camping Highlights Section */}
      <section className={styles.campingSection}>
        <h2 className={styles.sectionTitle}>Camping Spots You'll Love</h2>
        <div className={styles.campingGrid}>
          {galleryItems
            .filter(item => item.text.includes("Camping"))
            .slice(0, 4)
            .map((item, index) => (
              <div key={index} className={styles.campingCard}>
                <img
                  src={item.image}
                  alt={item.text}
                  className={styles.campingImage}
                />
                <div className={styles.campingContent}>
                  <h3 className={styles.campingTitle}>{item.text}</h3>
                  <p className={styles.campingDescription}>
                    {item.description && item.description.length > 80
                      ? item.description.slice(0, 80) + '...'
                      : item.description}
                  </p>
                  <Link to="/camping" className={styles.campingButton}>
                    More Info
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
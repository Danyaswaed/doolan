import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./camping.module.css";
import CampingCard from "../../components/campingCard/CampingCard";
import { getCampingSpots } from "../../services/api";
import ImgUpload from "../../components/imgUpload/ImgUpload";
import ImageTrail from "../../components/ImageTrail/ImageTrail";

const Camping = () => {
  const [campingSpots, setCampingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampingSpots = async () => {
      try {
        setLoading(true);
        const response = await getCampingSpots();

        const spots = response.data.map((spot) => {
          const imageFilename = spot.camping_img?.split(",")[0];

          const fullImageUrl = imageFilename
            ? `http://localhost:5000/uploads/camping/${imageFilename}`
            : "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1170&q=80";

          return {
            id: spot.id || spot._id,
            camping_name: spot.camping_name || "Unnamed Camping Spot",
            camping_location_name:
              spot.camping_location_name || "Location not specified",
            camping_description:
              spot.camping_description || "No description available",
            camping_img: fullImageUrl,
            camping_duration: spot.camping_duration || "",
            camping_difficulty: spot.camping_difficulty || "",
            camping_distance: spot.camping_distance || "",
          };
        });

        setCampingSpots(spots);
        setError(null);
      } catch (err) {
        console.error("Error fetching camping spots:", err);
        setError("Failed to fetch camping spots");
      } finally {
        setLoading(false);
      }
    };

    fetchCampingSpots();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Loading camping spots...</p>
      </div>
    );
  }

  return (
    <div className={styles.campingContainer}>
      {/* אזור תצוגה עליון עם אנימציית תמונות */}
      <div className={styles.discoverSection}>
        <h1>Discover Your Camping Adventure</h1>
        <p className={styles.subTitle}>
          Escape the ordinary. Find your perfect camping experience under the
          stars.
        </p>
        <div style={{ height: "450px", position: "relative", overflow: "hidden" }}>
         
          <ImageTrail
            items={campingSpots.map((spot, index) => ({
              key: `trail-${spot.id || index}`, // Adding prefix to ensure unique key
              url: spot.camping_img,
            }))}
            variant={1}
          />

        </div>
      </div>

      {/* כרטיסי הקמפינג */}
      <div className={styles.campingPage}>
        <section className={styles.campingSection}>
          <div className={styles.container}>
            {error && <div className={styles.errorMessage}>{error}</div>}

            {campingSpots.length > 0 ? (
              <div className={styles.campingGrid}>
                {campingSpots.map((spot) => (
                  <CampingCard
                    key={spot.id}
                    id={spot.id}
                    camping_name={spot.camping_name}
                    camping_location_name={spot.camping_location_name}
                    camping_img={spot.camping_img} // שם הפרופ תואם לקומפוננט CampingCard
                    camping_description={spot.camping_description}
                    camping_duration={spot.camping_duration}
                    camping_difficulty={spot.camping_difficulty}
                    camping_distance={spot.camping_distance}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <h3>No camping spots found</h3>
                <p>Try adjusting your search or check back later for new locations.</p>
              </div>
            )}
          </div>

          <ImgUpload />
        </section>
      </div>
    </div>
  );
};

export default Camping;

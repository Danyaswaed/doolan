// src/pages/Attractions.jsx
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/api';
import AttractionCard from '../../components/attractionCard/AttractionCard';
import styles from './attraction.module.css';

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/attractions');
        // Transform the data to match our expected format
        const transformedAttractions = response.data.map(attr => ({
          _id: attr.id,
          attraction_name: attr.attraction_name,
          attraction_location_name: attr.attraction_location_name,
          attraction_image: attr.attraction_image,
          attraction_description: attr.attraction_description,
          attraction_difficulty: attr.attraction_difficulty,
          attraction_duration: attr.attraction_duration,
          attraction_distance: attr.attraction_distance
        }));
        
        // Organize attractions by category
        const organizedAttractions = transformedAttractions.reduce((acc, attr) => {
          const category = attr.attraction_category || 'לא מוגדר';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(attr);
          return acc;
        }, {});
        
        setAttractions(organizedAttractions);
        setError(null);
      } catch (err) {
        console.error("Error loading attractions:", err);
        setError("Failed to load attractions");
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  return (
    <div className={styles.attractionsPage}>
      <h2 className={styles.title}>אטרקציות</h2>

      {/* Render each category section */}
      {Object.entries(attractions).map(([category, categoryAttractions]) => (
        <div key={category} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>{category}</h3>
          <div className={styles.categoryGrid}>
            {categoryAttractions.map((attr) => (
              <div className={styles.card} key={attr._id}>
                <img 
                  src={attr.image || 'https://via.placeholder.com/400'} 
                  alt={attr.name}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h4 className={styles.cardTitle}>{attr.name}</h4>
                  <p className={styles.cardLocation}>{attr.location}</p>
                  <p className={styles.cardDescription}>{attr.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attractions;

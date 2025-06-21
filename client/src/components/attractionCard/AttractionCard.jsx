// src/components/attractioncard/AttractionCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRoute, FaClock } from 'react-icons/fa';
import styles from './attractionCard.module.css';

const AttractionCard = ({
  _id,
  attraction_name,
  attraction_location_name,
  attraction_image,
  attraction_description,
  attraction_difficulty,
  attraction_duration,
  attraction_distance
}) => {
  const navigate = useNavigate();

  const imageUrl = attraction_image
   ??'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80';
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const mins = parseInt(minutes, 10);
    if (isNaN(mins)) return 'N/A';
    if (mins < 60) return `${mins} min`;
    if (mins < 1440) return `${Math.floor(mins / 60)} hours`;
    return `${Math.floor(mins / 1440)} days`;
  };

  const formatDistance = (distance) => {
    if (!distance) return 'N/A';
    const dist = parseFloat(distance);
    return isNaN(dist) ? 'N/A' : `${dist.toFixed(dist % 1 === 0 ? 0 : 1)} km`;
  };

  const getDifficultyClass = (difficulty) => {
    if (!difficulty) return '';
    const diff = difficulty.toLowerCase();
    if (['easy', 'moderate', 'hard', 'extreme'].includes(diff)) {
      return styles[diff];
    }
    return '';
  };

  return (
    <div className={styles.card} onClick={() => navigate(`/attractions/${_id}`)}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={attraction_name || 'Attraction'}
          className={styles.image}
          onError={handleImageError}
          loading="lazy"
        />
        {attraction_difficulty && (
          <div className={`${styles.difficulty} ${getDifficultyClass(attraction_difficulty)}`}>
            {attraction_difficulty}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{attraction_name || 'Unnamed Attraction'}</h3>
        {attraction_location_name && (
          <p className={styles.location}>
            <FaMapMarkerAlt className={styles.icon} /> {attraction_location_name}
          </p>
        )}
        {attraction_description && (
          <p className={styles.description}>
            {attraction_description.length > 120
              ? `${attraction_description.substring(0, 120)}...`
              : attraction_description}
          </p>
        )}
        <div className={styles.stats}>
          <span className={styles.stat}>
            <FaClock className={styles.icon} /> {formatDuration(attraction_duration)}
          </span>
          {attraction_distance != null && (
            <span className={styles.stat}>
              <FaRoute className={styles.icon} /> {formatDistance(attraction_distance)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;

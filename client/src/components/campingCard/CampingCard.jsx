import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRoute, FaClock } from 'react-icons/fa';
import styles from './campingCard.module.css';

const CampingCard = ({
  id,
  camping_name,
  camping_location_name,
  camping_img,
  camping_description,
  camping_difficulty,
  camping_duration,
  camping_distance
}) => {
  const navigate = useNavigate();

  const imageUrl = camping_img
    ??
     'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1470&q=80';

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1470&q=80';
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

  return (
    <div className={styles.card} onClick={() => navigate(`/camping/${id}`)}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={camping_name}
          className={styles.image}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{camping_name}</h3>
        <div className={styles.location}>
          <FaMapMarkerAlt className={styles.locationIcon} />
          {camping_location_name}
        </div>
        <p className={styles.description}>{camping_description}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <FaClock className={styles.statIcon} />
            {formatDuration(camping_duration)}
          </div>
          <div className={styles.stat}>
            <FaRoute className={styles.statIcon} />
            {formatDistance(camping_distance)}
          </div>
        </div>
        <div className={`${styles.difficulty} ${styles[camping_difficulty?.toLowerCase()]}`}>
          {camping_difficulty}
        </div>
      </div>
    </div>
  );
};

export default CampingCard;

import React from 'react';
import { CountryCardProps } from '../../types';
import styles from './CountryCard.module.css';

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  isVisited,
  toggleVisited,
}) => {
  return (
    <div className={`${styles.card} ${isVisited ? styles.visited : ''}`}>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital}</p>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isVisited}
          onChange={() => toggleVisited(country.name.common)}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxCustom}></span>
        <span className={styles.visitedText}>Visited</span>
      </label>
    </div>
  );
};

CountryCard.displayName = 'CountryCard';
export default CountryCard;

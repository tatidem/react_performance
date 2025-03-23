import React, { useEffect, useState, useCallback } from 'react';
import { fetchCountries } from '../../api';
import { Country, RegionFilter, SortOrder } from '../../types';
import CountryCard from '../CountryCard/CountryCard';
import Controls from '../Controls/Controls';
import useProcessedCountries from '../../hooks/useProcessedCountries';
import useVisitedCountries from '../../hooks/useVisitedCountries';
import styles from './CountryList.module.css';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const { visitedCountries, toggleVisited } = useVisitedCountries();
  const processedCountries = useProcessedCountries(
    countries,
    regionFilter,
    searchTerm,
    sortOrder
  );

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleRegionFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setRegionFilter(e.target.value as RegionFilter),
    []
  );

  return (
    <div className={styles.container}>
      <Controls
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        regionFilter={regionFilter}
        onRegionFilterChange={handleRegionFilter}
        sortOrder={sortOrder}
        onSortOrderChange={(e) => setSortOrder(e.target.value as SortOrder)}
      />
      <div className={styles.countryGrid}>
        {processedCountries.length > 0 ? (
          processedCountries.map((country) => (
            <CountryCard
              key={country.name.common}
              country={country}
              isVisited={visitedCountries.includes(country.name.common)}
              toggleVisited={toggleVisited}
            />
          ))
        ) : countries.length > 0 && searchTerm !== '' ? (
          <div className={styles.noResults}>Nothing found</div>
        ) : null}
      </div>
    </div>
  );
};

export default CountryList;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { fetchCountries } from '../../api';
import { Country, RegionFilter, SortOrder } from '../../types';
import CountryCard from '../CountryCard/CountryCard';
import styles from './CountryList.module.css';

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    const storedVisited = localStorage.getItem('visitedCountries');
    return storedVisited ? JSON.parse(storedVisited) : [];
  });

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
  }, [visitedCountries]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    []
  );

  const handleRegionFilter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setRegionFilter(e.target.value as RegionFilter),
    []
  );

  const handleSortOrder = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSortOrder(e.target.value as SortOrder),
    []
  );

  const toggleVisited = useCallback((countryName: string) => {
    setVisitedCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  }, []);

  const processedCountries = useMemo(() => {
    let result = countries;

    if (regionFilter) {
      result = result.filter((country) => country.region === regionFilter);
    }

    if (searchTerm) {
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.name.common.localeCompare(a.name.common));
    } else if (sortOrder === 'population_asc') {
      result.sort((a, b) => a.population - b.population);
    } else if (sortOrder === 'population_desc') {
      result.sort((a, b) => b.population - a.population);
    }

    return result;
  }, [countries, regionFilter, searchTerm, sortOrder]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <select
          value={regionFilter}
          onChange={handleRegionFilter}
          className={styles.select}
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          value={sortOrder}
          onChange={handleSortOrder}
          className={styles.select}
        >
          <option value="asc">Sort by Name (A-Z)</option>
          <option value="desc">Sort by Name (Z-A)</option>
          <option value="population_asc">
            Sort by Population (Low to High)
          </option>
          <option value="population_desc">
            Sort by Population (High to Low)
          </option>
        </select>
      </div>
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
        ) : (
          <div className={styles.noResults}>Nothing found</div>
        )}
      </div>
    </div>
  );
};

export default CountryList;

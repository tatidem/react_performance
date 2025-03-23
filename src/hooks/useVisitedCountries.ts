import { useState, useEffect } from 'react';

const useVisitedCountries = () => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    const storedVisited = localStorage.getItem('visitedCountries');
    return storedVisited ? JSON.parse(storedVisited) : [];
  });

  useEffect(() => {
    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
  }, [visitedCountries]);

  const toggleVisited = (countryName: string) => {
    setVisitedCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((name) => name !== countryName)
        : [...prev, countryName]
    );
  };

  return { visitedCountries, toggleVisited };
};

export default useVisitedCountries;

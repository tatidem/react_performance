import { useMemo } from 'react';
import { Country, RegionFilter, SortOrder } from '../types';

const useProcessedCountries = (
  countries: Country[],
  regionFilter: RegionFilter,
  searchTerm: string,
  sortOrder: SortOrder
) => {
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

  return processedCountries;
};

export default useProcessedCountries;

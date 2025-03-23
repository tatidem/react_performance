export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
  };
}

export type RegionFilter =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | '';

export type SortOrder = 'asc' | 'desc' | 'population_asc' | 'population_desc';

export interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  toggleVisited: (countryName: string) => void;
}

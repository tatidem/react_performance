import React from 'react';
import SelectInput from '../SelectInput/SelectInput';
import styles from './Controls.module.css';

interface ControlsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  regionFilter: string;
  onRegionFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOrder: string;
  onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Controls: React.FC<ControlsProps> = ({
  searchTerm,
  onSearchChange,
  regionFilter,
  onRegionFilterChange,
  sortOrder,
  onSortOrderChange,
}) => {
  const regionOptions = [
    { value: '', label: 'All Regions' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
  ];

  const sortOptions = [
    { value: 'asc', label: 'Sort by Name (A-Z)' },
    { value: 'desc', label: 'Sort by Name (Z-A)' },
    { value: 'population_asc', label: 'Sort by Population (Low to High)' },
    { value: 'population_desc', label: 'Sort by Population (High to Low)' },
  ];

  return (
    <div className={styles.controls}>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={onSearchChange}
        className={styles.searchInput}
      />
      <SelectInput
        value={regionFilter}
        onChange={onRegionFilterChange}
        options={regionOptions}
        className={styles.select}
      />
      <SelectInput
        value={sortOrder}
        onChange={onSortOrderChange}
        options={sortOptions}
        className={styles.select}
      />
    </div>
  );
};

export default Controls;

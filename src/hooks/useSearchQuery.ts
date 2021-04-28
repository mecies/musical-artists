import { ChangeEvent, useState } from 'react';
import { useDebounce } from 'use-debounce/lib';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const handleSetSearchQuery = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    debouncedSearchQuery,
    handleSetSearchQuery,
  };
};

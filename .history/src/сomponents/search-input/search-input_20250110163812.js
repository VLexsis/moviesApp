import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import MovieServices from '../../services/services';

const SearchInput = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const movieServices = new MovieServices();

  const performSearch = useCallback(
    debounce((query) => {
      return movieServices.fetchMovies(query)
        .then((response) => {
          onSearch(response); // Передаем результаты поиска в родительский компонент
        })
        .catch((error) => {
          console.error('Ошибка при поиске фильмов:', error);
        });
    }, 300),
    [onSearch]
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    performSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите текст для поиска"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
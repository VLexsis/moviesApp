import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import MovieServices from '../../services/services'; 

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  this.movieServices = new MovieServices();

 
  const performSearch = useCallback(
    debounce((query) => {
        this.movieServices.fetchMovies(query)
        .then
    }, 300), 
    [] 
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value); // Обновляем состояние
    performSearch(value);  // Вызываем дебаунсированную функцию
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
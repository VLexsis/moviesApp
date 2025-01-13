import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import MovieServices from '../../services/services'; 

export default class SearchInput extends Component {
  const [searchValue, setSearchValue] = useState('')
  this.movieServices = new MovieServices()
 
  const performSearch = useCallback(
    
    debounce((query) => {
        this.movieServices.fetchMovies(query)
        .then((response) => console.log(response))
    }, 300), 
    [] 
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value); // Обновляем состояние
    performSearch(value);  // Вызываем дебаунсированную функцию
  };

  render() {
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
  }

  
};


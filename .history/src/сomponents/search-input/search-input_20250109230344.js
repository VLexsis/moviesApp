import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');

  // Дебаунсированная версия функции performSearch
  const performSearch = useCallback(
    debounce((query) => {
      console.log('Выполняем поиск по запросу:', query);
      // Здесь может быть вызов API или другая логика поиска
    }, 300), 
    [] // Зависимости (пустой массив, чтобы функция создавалась только один раз)
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
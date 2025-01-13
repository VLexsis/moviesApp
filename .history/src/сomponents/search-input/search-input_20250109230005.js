import React, { useState, useEffect} from 'react';
import { Input } from 'antd';
import MovieServices from '../../services/services';

const SearchInput = () => {
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        // Дебаунсинг: выполняем поиск через 500 мс после последнего ввода
        const delayDebounceFn = setTimeout(() => {
          performSearch(searchValue);
        }, 500);
    
        return () => clearTimeout(delayDebounceFn);
      }, [searchValue]);
    
      const performSearch = (query) => {
        console.log('Выполняем поиск по запросу:', query);
        // Здесь может быть вызов API или другая логика поиска
      };

  return (
    <div>
      <Input
        placeholder="Введите текст для поиска"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
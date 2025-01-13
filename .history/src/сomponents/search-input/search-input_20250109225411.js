import React, { useState } from 'react';
import { Input } from 'antd';
import MovieServices from '../../services/services';

const SearchInput = () => {
 const [searchValue, setSearchValue] = useState('')

  const 

  const performSearch = (query) => {
   
    console.log('Выполняем поиск по запросу:', query);
  };

  return (
    <div>
      <Input
        placeholder="Введите текст для поиска"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
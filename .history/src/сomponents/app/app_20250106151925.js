import { Pagination } from 'antd'
import React from 'react'

const App = () => {
    return (
      <section className="movies-app">
        <header className="header">
          <Header /> {/* Компонент заголовка */}
        </header>
        <section className="main">
          <SearchInput /> {/* Поле поиска */}
          <MoviesCard /> 
          <Pagination /> 
        </section>
      </section>
    );
  };
  
  export default App;
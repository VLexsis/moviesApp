import { Pagination } from 'antd'
import React from 'react'
import Header from './header'

const App = () => {
    return (
      <section className="movies-app">
        <header className="header">
          <Header />
        </header>
        <section className="main">
          <SearchInput />
          <MoviesCard /> 
          <Pagination /> 
        </section>
      </section>
    );
  };
  
  export default App;
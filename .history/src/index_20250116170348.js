import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'


const App = () => {
    return (
        <section className="movies-app">
            <SearchForm query={query} onSearchChange={handleSearchChange} /> 
            <MoviesContainer />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

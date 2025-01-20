import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'
import SearchForm from './components/searchForm/searchForm'

const App = () => {
    const [query, setQuery] = useState('') // Состояние для поискового запроса

    const handleSearchChange = (e) => {
        setQuery(e.target.value) // Обновляем состояние при изменении значения в поле поиска
    }
    return (
        <section className="movies-app">
            <SearchForm query={query} onSearchChange={handleSearchChange} />
            <MoviesContainer query={query} />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

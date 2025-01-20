import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'
import SearchForm from '../searchForm/searchForm'
import SearchForm from './components/searchForm/searchForm'

const App = () => {
    return (
        <section className="movies-app">
            <SearchForm />
            <MoviesContainer />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

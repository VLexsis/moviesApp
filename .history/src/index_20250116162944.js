import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesCard from './components/MoviesContainer/MoviesContainer'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'

const App = () => {
    return (
        <section className="movies-app">
            <MoviesContainer />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesCard from './components/MoviesCard/MoviesContainer'

const App = () => {
    return (
        <section className="movies-app">
            <MoviesCard />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

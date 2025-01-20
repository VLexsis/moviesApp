import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesCard from './сomponents/MoviesCard/movies-card'

const App = () => {
    return (
        <section className="movies-app">
            <MoviesCard />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

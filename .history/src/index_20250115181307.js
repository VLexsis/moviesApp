import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesCard from './сomponents/movies-card/movies-card'

const App = () => {
    return (
        <section className="movies-app">
            <MoviesContainer /> {/* Используем MoviesContainer вместо MoviesCard */}
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

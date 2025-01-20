import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesContainer from './components/moviesContainer/moviesContainer'
const App = () => {
    return (
        <section className="movies-app">
            <MoviesContainer />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)

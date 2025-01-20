import React from 'react'
import { createRoot } from 'react-dom/client'
import MoviesContainer from './components/MoviesContainer/MoviesContainer'
import Search from 'antd/es/transfer/search'

const App = () => {
    return (
        <section className="movies-app">
            <SearchF
            <MoviesContainer />
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)


import React from 'react'
import { createRoot } from 'react-dom/client';
import MoviesCard from './сomponents/movies-card/movies-card'


const App = () => {
    return (
        
        <section className="movies-app">
            
            <MoviesCard/>
        </section>
    )
}
const root = createRoot(document.getElementById('root'));


root.render(<App/>);





/*
const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
*/
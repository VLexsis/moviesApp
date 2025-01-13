
import React from 'react'
import { createRoot } from 'react-dom/client';
import MoviesCard from './сomponents/movies-card/movies-card'
import { Pagination } from 'antd';




const App = () => {
    return (
        
        <section className="movies-app">
            <MoviesCard/>
            <Pagination align="center" defaultCurrent={1} total={50} />
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
import React from 'react';
import { createRoot } from 'react-dom/client';


class MovieServices {
   async getResource() {
        const res = await fetch(url)
    return await res.json()
    }

    getAllMovies() {
        return this.getResource('https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1')
    }


}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
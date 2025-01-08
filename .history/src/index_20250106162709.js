import React from 'react';
import { createRoot } from 'react-dom/client';


class MovieServices {
   async getMovies = async (url) => {
        const res = await fetch(url)
    return await res.json()
       
    }

}
const MoviesCard = () => {
    const API_KEY = 'ed0fc049bfb3cad69f27a301343882ad';
    const BASE_URL = 'https://api.themoviedb.org/3'
    const getMovies = async (url) => {
        const res = await fetch(url)
        const body = await res.json()
        return body
    }

    getMovies('https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1')
    .then((body) => {
        console.log(body)
    })
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
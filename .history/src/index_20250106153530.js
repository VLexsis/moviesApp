import React from 'react';
import { createRoot } from 'react-dom/client';


const MoviesCard = () => {
    const API_KEY = 'ed0fc049bfb3cad69f27a301343882ad';
    const BASE_URL = 'https://api.themoviedb.org/3'
    const getFilm = async (url) => {
        const res = await fetch(url)
        const body = await res.json()
        return body
    }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
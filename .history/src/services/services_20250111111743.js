export default class MovieServices {
    async getResource(url) {
         const res = await fetch(url)
     return await res.json()
     }
 
     async fetchMovies(query, page = 1) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=ВАШ_API_KEY&query=${query}&page=${page}`;
        const res = await fetch(url);
        return await res.json();
    }
 }
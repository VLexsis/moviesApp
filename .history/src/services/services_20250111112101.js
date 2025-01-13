export default class MovieServices {
    async getResource(url) {
         const res = await fetch(url)
     return await res.json()
     }
 
     async fetchMovies(query, page = 1) {
        const res = await this.getResource(
          `https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=${query}&include_adult=false&language=en-US&page=${page}`
        );
        return res.results;
      }
 }



class MovieServices {
   async getResource(url) {
        const res = await fetch(url)
    return await res.json()
    }

    async getAllMovies() {
      const res = await this.getResource('https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1')
    }

}

const movies = new MovieServices;
movies.getAllMovies().then((res) => {
    console.log(res)
})



/*
const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
*/
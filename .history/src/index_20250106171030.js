import MovieServices from "./services/services";
import

const movies = new MovieServices;
movies.getAllMovies().then((res) => {
    console.log(res)
})



/*
const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
*/
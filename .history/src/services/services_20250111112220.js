export default class MovieServices {
    async getResource(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async fetchMovies(query, page = 1) {
        try {
            const data = await this.getResource(
                `https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=${query}&include_adult=false&language=en-US&page=${page}`
            );
            if (data && data.results) {
                return data.results; // Возвращаем результаты поиска
            } else {
                throw new Error("Invalid data format from API");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error; // Пробрасываем ошибку для обработки в компоненте
        }
    }
}
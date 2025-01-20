export default class MovieServices {
    constructor() {
        this.apiKey = 'ed0fc049bfb3cad69f27a301343882ad' 
        this.baseUrl = 'https://api.themoviedb.org/3'
    }

    async createGuestSession() {
        const url = `${this.baseUrl}/authentication/guest_session/new?api_key=${this.apiKey}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Ошибка при создании гостевой сессии')
        }
        return response.json()
    }

    async fetchMovies(query, page) {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных')
        }
        return response.json()
    }
    async getRatedMovies(guestSessionId) {
        const url = `${this.baseUrl}/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Ошибка при загрузке оцененных фильмов')
        }
        return response.json()
    }
    async rateMovie(movieId, guestSessionId, rating) {
        const url = `${this.baseUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: rating }),
        })

        if (!response.ok) {
            throw new Error('Ошибка при оценке фильма')
        }

        return response.json()
    }

    async getGenres() {
        const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Ошибка при загрузке жанров')
        }
        return response.json()
    }
}

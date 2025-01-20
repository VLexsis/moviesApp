export default class MovieServices {
    constructor() {
        this.apiKey = 'ed0fc049bfb3cad69f27a301343882ad' // Замени на свой API-ключ
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

  addRating = async (movieId: number, rating: number, sessionId: string) => {
        try {
            const response = await axios.post(
                `https://api.themoviedb.org/3/movie/${movieId}/rating`,
                {
                    value: `${rating}`, // Рейтинг (от 0.5 до 10)
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`, // Используется Bearer Token
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    params: {
                        guest_session_id: `${sessionId}`, // ID гостевой сессии
                    },
                },
            );
            console.log('Успешно добавлен рейтинг для фильма:', response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при добавлении рейтинга:', error);
            throw error;
        }
    };
}

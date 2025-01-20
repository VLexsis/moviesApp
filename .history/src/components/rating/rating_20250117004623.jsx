

const addRating = async (movieId: number, rating: number, sessionId: string) => {
    try {
    const response = await axios.post(
    `https://api.themoviedb.org/3/movie/${movieId}/rating`,
    {
    value: `${rating}`,
    },
    {
    headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
    guest_session_id: `${sessionId}`,
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
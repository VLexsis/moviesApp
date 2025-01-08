import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты
import { use } from 'react';

const { Meta } = Card;

function shortenText(text, maxLength) {
    // Проверяем, нужно ли сокращать текст
    if (text.length <= maxLength) {
        return text; // Если текст уже достаточно короткий, возвращаем его
    } else {
        // Сокращаем текст и добавляем многоточие
        return text.slice(0, maxLength) + "...";
    }
}

const MoviesCard = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        fetch(
           'https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1' 
        )
        .then((response)=> response.json())
        .then((data) => {
            setMovies(data.results)
        })
    }, [])

    return (
        <Row gutter={[16,16]} style={{ padding: '24px' }}> 
        {movies.map((movie)=> (
            <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
<Card
    hoverable
cover={<img
    alt={movie.title}
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    />}
>
    < Meta
    title = {movie.title}
    description = {
        <><p>
            {movie.release_date
                ? format(new Date(movie.release_date), 'MMMM d, yyyy') // Форматируем дату
                : 'Unknown'}
        </p>
        <p>
            Genres: Action
            </p>
            <p>
                {movie.overview}
            </p>
            </>
    }
    />
</Card>
            </Col>
        ))}
        </Row>
    )
}


export default MoviesCard;
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты


const { Meta } = Card;

function shortenTextByWords(text, maxWords) {
    // Разделяем текст на слова
    let words = text.split(" ");
    // Проверяем, нужно ли сокращать текст
    if (words.length <= maxWords) {
        return text; // Если слов уже достаточно мало, возвращаем текст
    } else {
        // Сокращаем текст до указанного количества слов и добавляем многоточие
        return words.slice(0, maxWords).join(" ") + "...";
    }
}

const MoviesCard = () => {
    const [movies, setMovies] = useState([])

        fetch(
           'https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1' 
        )
        .then((response)=> response.json())
        .then((data) => {
            setMovies(data.results)
        })


    return (
        <Row gutter={[16,16]} style={{ padding: '24px' }}> 
        {movies.map((movie)=> (
            <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
<Card
    hoverable
    style={{ width: 454,
        height: 279
     }}
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
                ? format(new Date(movie.release_date), 'MMMM d, yyyy') // 
                : 'Unknown'}
        </p>
        <p>
            Genres: Action
            </p>
            <p>
                {shortenTextByWords(movie.overview, 25)}
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
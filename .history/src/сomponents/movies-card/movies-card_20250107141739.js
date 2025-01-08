import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты
import { use } from 'react';

const { Meta } = Card;

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
        <Row

    )
}



const MoviesCard = () => {
  const [movies, setMovies] = useState([]);

  // Запрос к API для получения данных
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1'
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
          <Card
            hoverable
            cover={
              <img
                alt={movie.title}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
              />
            }
          >
            <Meta
              title={movie.title}
              description={
                <>
                  <p>
                    Release Date:{' '}
                    {movie.release_date
                      ? format(new Date(movie.release_date), 'MMMM dd, yyyy') // Форматируем дату
                      : 'Unknown'}
                  </p>
                  <p>Rating: {movie.vote_average}</p>
                  <p>Genres: Action, Adventure</p> {/* Заглушка для жанров */}
                  <p>{truncateText(movie.overview, 100)}</p> {/* Сокращаем описание */}
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MoviesCard;
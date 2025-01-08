import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const MoviesApp = () => {
  const [movies, setMovies] = useState([]); 

  // Запрос к API для получения данных
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1'
    )
      .then((response) => response.json()) // Преобразуем ответ в JSON
      .then((data) => {
        setMovies(data.results); // Сохраняем данные в состояние
      });
  }, []);


  return (
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={
              <img
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              />
            }
          >
            <Meta
              title={movie.title}
              description={
                <>
                  <p>Release Date: {movie.release_date}</p>
                  <p>{movie.overview}</p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MoviesApp;
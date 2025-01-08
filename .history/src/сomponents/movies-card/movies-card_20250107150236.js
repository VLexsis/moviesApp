import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const MoviesCard = () => {
  const [movies, setMovies] = useState([]);

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
          <Card>
            <Row align="middle">
              {/* Колонка для изображения */}
              <Col xs={24} sm={8} md={6} lg={6}>
                <img
                  alt={movie.title}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  style={{ width: '100%', height: 'auto' }}
                />
              </Col>

              {/* Колонка для описания */}
              <Col xs={24} sm={16} md={18} lg={18} style={{ padding: '0 16px' }}>
                <Meta
                  title={movie.title}
                  description={
                    <>
                      <p>
                        Release Date:{' '}
                        {movie.release_date
                          ? new Date(movie.release_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Unknown'}
                      </p>
                      <p>Rating: {movie.vote_average}</p>
                      <p>Genres: Action, Adventure</p>
                      <p>{movie.overview}</p>
                    </>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MoviesCard;
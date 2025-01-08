import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты
import './movies-card.css'; // Подключаем CSS-файл

const { Meta } = Card;

// Функция для сокращения текста по количеству слов
function shortenTextByWords(text, maxWords) {
  let words = text.split(' ');
  if (words.length <= maxWords) {
    return text;
  } else {
    return words.slice(0, maxWords).join(' ') + '...';
  }
}

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
    <Row gutter={[16, 16]} className="movies-container">
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
          <Card hoverable className="movie-card">
            <Row>
              {/* Колонка для изображения */}
              <Col span={8}>
                <img
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="movie-image"
                />
              </Col>

              {/* Колонка для описания */}
              <Col span={16} className="movie-description">
                <Meta
                  title={movie.title}
                  description={
                    <>
                      <p>
                        {movie.release_date
                          ? format(new Date(movie.release_date), 'MMMM d, yyyy')
                          : 'Unknown'}
                      </p>
                      <p>Action</p>
                      <p>{shortenTextByWords(movie.overview, 25)}</p>
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
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты

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
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
          <Card
            hoverable
            style={{ width: 454, height: 279 }} // Фиксированные размеры карточки
            bodyStyle={{ padding: 0 }} // Убираем отступы внутри карточки
          >
            <Row>
              {/* Колонка для изображения (слева) */}
              <Col span={8} style={{ height: '100%' }}>
                <img
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  style={{
                    width: '100%',
                    height: '100%', // Изображение на всю высоту
                    objectFit: 'cover', // Чтобы изображение заполняло всю область
                  }}
                />
              </Col>

              {/* Колонка для описания (справа) */}
              <Col span={16} style={{ padding: '16px' }}>
                <Meta
                  title={movie.title}
                  description={
                    <>
                      <p>
                        {movie.release_date
                          ? format(new Date(movie.release_date), 'MMMM d, yyyy')
                          : 'Unknown'}
                      </p>
                      <p>Genres: Action</p>
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
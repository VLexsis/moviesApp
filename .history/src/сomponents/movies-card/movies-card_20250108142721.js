import React, { Component, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns'; 

import Spinner from '../spinner/spinner'


const { Meta } = Card;

function shortenTextByWords(text, maxWords) {
    // Разделяем текст на слова
    let words = text.split(" ");
 
    if (words.length <= maxWords) {
        return text; 
    } else {
    
        return words.slice(0, maxWords).join(" ") + "...";
    }
}

import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { format } from 'date-fns';

const { Meta } = Card;

class MoviesCard extends Component {
  state = {
    loading: false,
    error: false,
    movies: [], // Добавляем состояние для фильмов
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    this.setState({ loading: true, error: false });

    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1'
      );
      const data = await response.json();
      this.setState({ movies: data.results, loading: false });
    } catch (error) {
      this.setState({ error: true, loading: false });
      console.error('Ошибка при загрузке фильмов:', error);
    }
  };

  shortenTextByWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  render() {
    const { movies, loading, error } = this.state;

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Произошла ошибка при загрузке фильмов.</div>;

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
                    <p>
                      {movie.release_date
                        ? format(new Date(movie.release_date), 'd MMMM yyyy') // Форматируем дату
                        : 'Дата неизвестна'}
                    </p>
                    <p>Жанр: Action</p>
                    <p>{this.shortenTextByWords(movie.overview, 25)}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

ё
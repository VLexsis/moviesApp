import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns';
import Spinner from '../spinner/spinner';
import { Offline, Online } from 'react-detect-offline';
import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');

  // Дебаунсированная версия функции performSearch
  const performSearch = useCallback(
    debounce((query) => {
      console.log('Выполняем поиск по запросу:', query);
      // Здесь может быть вызов API или другая логика поиска
    }, 300), // Задержка 300 мс
    [] // Зависимости (пустой массив, чтобы функция создавалась только один раз)
  );

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value); // Обновляем состояние
    performSearch(value);  // Вызываем дебаунсированную функцию
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите текст для поиска"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;

const { Meta } = Card;


function shortenTextByWords(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
}

export default class MoviesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: true,
            error: false,
        };
        this.movieServices = new MovieServices();
    }

    componentDidMount() {

    if(navigator.onLine)  {
        this.getMoviesCard()
    } else {
        this.setState({loading: false})
    }
    }
    

    getMoviesCard() {
        this.movieServices.fetchMovies()
        .then((data) => {
            this.setState({ movies: data, loading: false });
        })
        .catch(() => {
            this.setState({ error: true, loading: false });
        });
    }

    render() {
        const { movies, loading, error } = this.state;

       if(!navigator.onLine) {
        return (
            <Offline>
                <p>❌ Нет подключения к интернету. Пожалуйста, проверьте ваше соединение.</p>
            </Offline>
        )
       }
        if (error) {
            return <p>Ошибка при загрузке данных</p>;
        }

        if (loading) {
            return <Spinner />;
        }

        return (
            <Online>
            <Row gutter={[16, 16]} style={{ padding: '24px' }}>
                {movies.map((movie) => (
                    <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
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
                                                ? format(new Date(movie.release_date), 'MMMM d, yyyy')
                                                : 'Unknown'}
                                        </p>
                                        <p>Action</p>
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
            </Online>
        );
    }
}



export default class MovieServices {
    async getResource(url) {
         const res = await fetch(url)
     return await res.json()
     }
 
     async fetchMovies(query) {
        const res = await this.getResource(
          `https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=${query}&include_adult=false&language=en-US&page=1`
        );
        return res.results;
      }
 }

import React, { Component } from 'react';
import { Card, Row, Col, Input, Empty } from 'antd'; // Импортируем Empty для сообщения об отсутствии результатов
import { format } from 'date-fns';
import Spinner from '../spinner/spinner';
import { Offline, Online } from 'react-detect-offline';
import MovieServices from '../../services/services';
import { debounce } from 'lodash'; // Импортируем debounce из lodash

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
            loading: false, // Изначально загрузка не активна
            error: false,
            query: '',
        };
        this.movieServices = new MovieServices();

        // Используем debounce для задержки запроса
        this.debouncedFetchMovies = debounce(this.getMoviesCard, 500);
    }

    componentDidMount() {
        if (navigator.onLine) {
            // При монтировании можно загрузить популярные фильмы или ничего не загружать
            // this.getMoviesCard();
        } else {
            this.setState({ loading: false });
        }
    }

    getMoviesCard = async (query = '') => {
        if (!query) {
            this.setState({ movies: [], loading: false });
            return;
        }

        this.setState({ loading: true, error: false });

        try {
            const data = await this.movieServices.fetchMovies(query);
            this.setState({ movies: data, loading: false });
        } catch (error) {
            this.setState({ error: true, loading: false });
        }
    }

    handleSearchChange = (e) => {
        const query = e.target.value;
        this.setState({ query });

        // Вызываем debounced-функцию для поиска
        this.debouncedFetchMovies(query);
    }

    render() {
        const { movies, loading, error, query } = this.state;

        if (!navigator.onLine) {
            return (
                <Offline>
                    <p>❌ Нет подключения к интернету. Пожалуйста, проверьте ваше соединение.</p>
                </Offline>
            );
        }

        if (error) {
            return <p>Ошибка при загрузке данных</p>;
        }

        return (
            <Online>
                <div style={{ padding: '24px' }}>
                    <Input
                        placeholder="Type to search..."
                        value={query}
                        onChange={this.handleSearchChange}
                        style={{ marginBottom: '24px' }}
                    />
        
                    {(() => {
                        if (loading) {
                            return <Spinner />; // Спиннер во время загрузки
                        }
        
                        if (!loading && movies.length === 0 && query) {
                            return <Empty description="Ничего не найдено" />; // Сообщение, если результатов нет
                        }
        
                        if (!loading && movies.length > 0) {
                            return (
                                <Row gutter={[16, 16]}>
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
                            );
                        }
        
                        return null; // Если ни одно из условий не выполнено
                    })()}
                </div>
            </Online>
        );
    }
}


import React from 'react'
import { createRoot } from 'react-dom/client';
import MoviesCard from './сomponents/movies-card/movies-card'





const App = () => {
    return (
        
        <section className="movies-app">
            <MoviesCard/>
        </section>
    )
}
const root = createRoot(document.getElementById('root'));


root.render(<App/>);





/*
const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
*/


* Результаты поиска должны быть разделены постранично (используйте antd pagination). Постраничное деление данных (pagination) реализовывается на сервере, вам лишь нужно отобразить интерфейс для его использования. Найдите необходимое API для этого и воспользуйтесь им.


import React, { Component } from 'react';
import { Card, Row, Col, Input, Empty, Pagination } from 'antd';
import { format } from 'date-fns';
import Spinner from '../spinner/spinner';
import { Offline, Online } from 'react-detect-offline';
import MovieServices from '../../services/services';
import { debounce } from 'lodash';

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
            movies: [], // Инициализируем как пустой массив
            loading: false,
            error: false,
            query: '',
            page: 0,
            totalResults: 0,
        };
        this.movieServices = new MovieServices();

        this.debouncedFetchMovies = debounce(this.getMoviesCard, 500);
    }

    componentDidMount() {
        if (navigator.onLine) {
            // При монтировании можно загрузить популярные фильмы
            // this.getPopularMovies();
        } else {
            this.setState({ loading: false });
        }
    }

    async getMoviesCard(query = '', page) {
        if (!query) {
            this.setState({ movies: [], loading: false });
            return;
        }
    
        this.setState({ loading: true, error: false });
    
        try {
            const data = await this.movieServices.fetchMovies(query, page);
            if (data && data.results) { // Проверяем, что data и data.results существуют
                this.setState({
                    movies: data.results,
                    totalResults: data.total_results,
                    loading: false,
                });
            } else {
                this.setState({ movies: [], loading: false }); // Если data.results отсутствует, очищаем movies
            }
        } catch (error) {
            this.setState({ error: true, loading: false });
        }
    }

    handleSearchChange = (e) => {
        const query = e.target.value;
        this.setState({ query, page: 1 }); // Сбрасываем страницу на 1 при новом поиске
        this.debouncedFetchMovies(query, 1); // Передаем query и page=1
    };

    handlePageChange = (page) => {
        this.setState({ page }, () => {
            this.getMoviesCard(this.state.query, page);
        });
    };

    render() {
        const { movies, loading, error, query, page, totalResults } = this.state;

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
                            return <Spinner />;
                        }

                        if (!loading && Array.isArray(movies) && movies.length === 0 && query) {
                            return <Empty description="Ничего не найдено" />;
                        }

                        if (!loading && Array.isArray(movies) && movies.length > 0) {
                            return (
                                <>
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
                                    <Pagination
                                        style={{ marginTop: '24px', textAlign: 'center' }}
                                        current={page}
                                        total={totalResults}
                                        pageSize={20}
                                        onChange={this.handlePageChange}
                                    />
                                </>
                            );
                        }

                        return null;
                    })()}
                </div>
            </Online>
        );
    }
}
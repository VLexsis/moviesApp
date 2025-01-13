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
            loading: false, 
            error: false,
            query: '',
        };
        this.movieServices = new MovieServices();

       
        this.debouncedFetchMovies = debounce(this.getMoviesCard, 500);
    }

    componentDidMount() {
        if (navigator.onLine) {
        
        } else {
            this.setState({ loading: false });
        }
    }

    async getMoviesCard(query = '') { 
        if(!query) {
            this.setState({movies: [], loading: false})
            return
        }
        this.setState({ loading: true, error: false });


        try {
            const data = await this.movieServices.fetchMovies(query)
            this.setState({movies: data, loading: false})
        }
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
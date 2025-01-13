import React, { Component } from 'react';
import { Card, Row, Col, Input } from 'antd'; // Импортируем Input из antd
import { format } from 'date-fns';
import Spinner from '../spinner/spinner';
import { Offline, Online } from 'react-detect-offline';
import MovieServices from '../../services/services'; 


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
            query: '',
        };
        this.movieServices = new MovieServices();
    }

    componentDidMount() {
        if (navigator.onLine) {
            this.getMoviesCard();
        } else {
            this.setState({ loading: false });
        }
    }

    getMoviesCard = (query = '') => {
        this.movieServices.fetchMovies(query)
            .then((data) => {
                this.setState({ movies: data, loading: false });
            })
            .catch(() => {
                this.setState({ error: true, loading: false });
            });
    }

    handleSearchChange = (e) => {
        const query = e.target.value;
        this.setState({ query }, () => {
            this.getMoviesCard(query);
        });
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

        if (loading) {
            return <Spinner />;
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
                </div>
            </Online>
        );
    }
}
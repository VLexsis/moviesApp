import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { format } from 'date-fns';
import Spinner from '../spinner/spinner';
import { Offline, Online } from 'react-detect-offline';
import MovieServices from '../../services/services'; 
import SearchInput from '../search-input/search-input';

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
        this.searchInput = new SearchInput()
    }

    componentDidMount() {

    if(navigator.onLine)  {
        this.getMoviesCard()
    } else {
        this.setState({loading: false})
    }
    }
    

    getMoviesCard() {
        this.movieServices.fetch()
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
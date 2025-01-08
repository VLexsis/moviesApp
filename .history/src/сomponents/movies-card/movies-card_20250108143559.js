import React, { useState } from 'react';
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

export default class MoviesCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        fetch(
            'https://api.themoviedb.org/3/search/movie?api_key=ed0fc049bfb3cad69f27a301343882ad&query=return&include_adult=false&language=en-US&page=1'
        )
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movies: data.results });
            });
    }

    shortenTextByWords(text, maxWords) {
        const words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    }

    render() {
        const { movies, loading, error } = this.state;
        const hasData = !(loading || error)

    const errorMessage = error ? <p> Ошибка </p> : null
    const spinner = loading ? <Spinner/> : null
    

        return (
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
                                            {this.shortenTextByWords(movie.overview, 25)}
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
}



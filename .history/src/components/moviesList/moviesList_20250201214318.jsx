import React, { Component, useContext } from 'react'
import { Row, Col } from 'antd'
import MovieCard from '../movieCard/movieCard'
import './moviesList.css'

class MoviesList extends Component {
    render() {
        const { movies, guestSessionId, genres,ratings,   } = this.props

        return (
            <Row justify="center" gutter={[16, 16]}>
                {movies.map((movie) => (
                    <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                        <MovieCard movie={movie} guestSessionId={guestSessionId} genres={genres}
                        rating={ratings[movie.id]}
                        onRateMovie={onRateMovie} />
                    </Col>
                ))}
            </Row>
        )
    }
}

export default MoviesList

import React from 'react'
import { Row, Col } from 'antd'
import MovieCard from '../movieCard/movieCard'
import './moviesList.css'

const MoviesList = ({ movies, guestSessionId = { guestSessionId } }) => {
    return (
        <Row justify="center" gutter={[16, 16]}>
            {movies.map((movie) => (
                <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                    <MovieCard movie={movie} guestSessionId={guestSessionId} />
                </Col>
            ))}
        </Row>
    )
}

export default MoviesList

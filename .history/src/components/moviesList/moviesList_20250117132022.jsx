import React from 'react'
import { Row, Col } from 'antd'
import MovieCard from '../movieCard/movieCard'
import 

const MoviesList = ({ movies }) => {
    return (
        <Row gutter={[16, 16]}>
            {movies.map((movie) => (
                <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </Row>
    )
}

export default MoviesList

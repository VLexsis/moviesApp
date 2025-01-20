import React from 'react'
import { Row, Col } from 'antd'
import MovieCard from '../movieCard/movieCard'

const MoviesList = ({ movies }) => {
    return (
        <Row gutter={[36, 36]}>
            {' '}
            {/* Горизонтальный и вертикальный отступы 36px */}
            {movies.map((movie) => (
                <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </Row>
    )
}

export default MoviesList

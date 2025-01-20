import React, { Component } from 'react'
import { Row, Col } from 'antd' // Импорт компонентов из antd
import MovieCard from '../movieCard/movieCard'
import GenresContext from '../../GenresContext/GenresContext'
import './moviesList.css'

class MoviesList extends Component {
    render() {
        const { movies, guestSessionId } = this.props

        return (
            <GenresContext.Consumer>
                {(genres) => {
                    const getGenreNames = (genreIds) => {
                        return genreIds
                            .map((id) => genres.find((genre) => genre.id === id)?.name)
                            .filter((name) => name)
                            .join(', ')
                    }

                    return (
                        <Row justify="center" gutter={[16, 16]}>
                            {movies.map((movie) => (
                                <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                                    <MovieCard
                                        movie={movie}
                                        guestSessionId={guestSessionId}
                                        genreNames={getGenreNames(movie.genre_ids)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )
                }}
            </GenresContext.Consumer>
        )
    }
}

export default MoviesList

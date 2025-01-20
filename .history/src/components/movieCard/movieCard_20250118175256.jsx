import React, { Component } from 'react'
import GenresContext from './/GenresContext'
import './movieCard.css'

class MovieCard extends Component {
    render() {
        const { movie } = this.props

        return (
            <GenresContext.Consumer>
                {(genres) => {
                    // Функция для получения названий жанров по их ID
                    const getGenreNames = (genreIds) => {
                        return genreIds
                            .map((id) => genres.find((genre) => genre.id === id)?.name)
                            .filter((name) => name)
                            .join(', ')
                    }

                    return (
                        <div className="movie-card">
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                            <p>
                                <strong>Жанры:</strong> {getGenreNames(movie.genre_ids)}
                            </p>
                            {/* Дополнительные элементы карточки фильма */}
                        </div>
                    )
                }}
            </GenresContext.Consumer>
        )
    }
}

export default MovieCard

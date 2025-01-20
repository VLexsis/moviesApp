import React, { Component } from 'react'
import { Card, Rate, message } from 'antd'
import { format } from 'date-fns'
import './movieCard.css'
import MovieServices from '../../services/services'

const { Meta } = Card

function shortenTextByWords(text, maxWords) {
    const words = text.split(' ')
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...'
    }
    return text
}

class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: props.movie.rating || 0,
        }

        this.movieServices = new MovieServices()
    }

    handleRateChange = async (value) => {
        const { movie, guestSessionId } = this.props

        try {
            await this.movieServices.rateMovie(movie.id, guestSessionId, value)
            this.setState({ rating: value })
        } catch (error) {
            message.error('Ошибка при оценке фильма')
        }
    }

    render() {
        const { movie, genres } = this.props
        const { rating } = this.state

        // Получаем названия жанров для текущего фильма
        const movieGenres = movie.genre_ids
            ? movie.genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name)
            : []

        return (
            <Card className="movie-card">
                <div className="movie-card__content">
                    <img
                        alt={movie.title}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="movie-card__image"
                    />
                    <div className="movie-card__details">
                        <Meta
                            title={movie.title}
                            description={
                                <>
                                    <p>
                                        {movie.release_date
                                            ? format(new Date(movie.release_date), 'MMMM d, yyyy')
                                            : 'Unknown'}
                                    </p>
                                    <p>{shortenTextByWords(movie.overview, 25)}</p>
                                    <p className="movie-card__genres-list">
                                        <strong>Жанры:</strong>{' '}
                                        {movieGenres.filter(Boolean).map((genre, index) => (
                                            <span key={index} className="movie-card__genre">
                                                {genre}
                                            </span>
                                        ))}
                                    </p>
                                    <Rate allowHalf count={10} value={rating} onChange={this.handleRateChange} />
                                </>
                            }
                        />
                    </div>
                </div>
            </Card>
        )
    }
}

export default MovieCard

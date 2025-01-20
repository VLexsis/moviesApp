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

    getRatingColor = (rating) => {
        if (rating >= 0 && rating < 3) return '#E90000'
        if (rating >= 3 && rating < 5) return '#E97E00'
        if (rating >= 5 && rating < 7) return '#E9D100'
        if (rating >= 7) return '#66E900'
        return '#E90000' // По умолчанию
    }

    render() {
        const { movie, genres } = this.props
        const { rating } = this.state

        // Получаем названия жанров для текущего фильма
        const movieGenres = movie.genre_ids
            ? movie.genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name)
            : []

        const ratingColor = this.getRatingColor(movie.vote_average)

        return (
            <Card className="movie-card">
                <div className="movie-card__content">
                    <div className="movie-card__rating" style={{ borderColor: ratingColor }}>
                        {movie.vote_average.toFixed(1)}
                    </div>
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

                                    <p className="movie-card__genres-list">
                                        {movieGenres.filter(Boolean).map((genre, index) => (
                                            <span key={index} className="movie-card__genre">
                                                {genre}
                                            </span>
                                        ))}
                                    </p>
                                    <p>{shortenTextByWords(movie.overview, 25)}</p>
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

import React, { useState } from 'react'
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

const MovieCard = ({ movie, guestSessionId }) => {
    const [rating, setRating] = useState(movie.rating || 0)
    const movieServices = new MovieServices()

    const handleRateChange = async (value) => {
        try {
            await movieServices.rateMovie(movie.id, guestSessionId, value)
            setRating(value)
        } catch (error) {
            message.error('Ошибка при оценке фильма')
        }
    }

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
                                <Rate allowHalf count={10} value={rating} onChange={handleRateChange} />
                            </>
                        }
                    />
                </div>
            </div>
        </Card>
    )
}

export default MovieCard

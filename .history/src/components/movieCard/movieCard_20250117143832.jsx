import React from 'react'
import { Card, Rate } from 'antd'
import { format } from 'date-fns'
import './movieCard.css' // Подключаем стили

const { Meta } = Card

function shortenTextByWords(text, maxWords) {
    const words = text.split(' ')
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...'
    }
    return text
}

const MovieCard = ({ movie }) => {
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
                                <p>Action</p>
                                <p>{shortenTextByWords(movie.overview, 25)}</p>
                                R
                            </>
                        }
                    />
                </div>
            </div>
        </Card>
    )
}

export default MovieCard

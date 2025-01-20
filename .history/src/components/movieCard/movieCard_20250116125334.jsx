import React from 'react'
import { Card } from 'antd'
import { format } from 'date-fns'

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
        <Card hoverable cover={<img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />}>
            <Meta
                title={movie.title}
                description={
                    <>
                        <p>{movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'Unknown'}</p>
                        <p>Action</p>
                        <p>{this.shortenTextByWords(movie.overview, 25)}</p>
                    </>
                }
            />
        </Card>
    )
}

export default MovieCard

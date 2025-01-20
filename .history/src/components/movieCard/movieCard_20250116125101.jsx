import React from 'react'
import { Card, } from 'antd'

const MovieCard = ({ movie }) => {
    return (
        <Card hoverable cover={<img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />}>
            <Meta
                title={movie.title}
                description={
                    <>
                        <p>{movie.release_date ? format(new Date(movie.release_date), 'MMMM d, yyyy') : 'Unknown'}</p>
                        <p>Action</p>
                        <p>{shortenTextByWords(movie.overview, 25)}</p>
                    </>
                }
            />
        </Card>
    )
}

export default MovieCard

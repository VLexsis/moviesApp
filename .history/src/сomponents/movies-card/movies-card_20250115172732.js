import React, { Component } from 'react'
import { Card, Row, Col, Input, Empty, Pagination } from 'antd' // Импортируем Pagination
import { format } from 'date-fns'
import Spinner from '../spinner/spinner'
import { Offline, Online } from 'react-detect-offline'
import MovieServices from '../../services/services'
import { debounce } from 'lodash'

const { Meta } = Card

function shortenTextByWords(text, maxWords) {
    const words = text.split(' ')
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...'
    }
    return text
}

export default class MoviesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            loading: false,
            error: false,
            query: '',
            currentPage: 1,
            totalPages: 1,
        }
        this.movieServices = new MovieServices()
        this.debouncedFetchMovies = debounce(this.getMoviesCard, 500)
    }

    componentDidMount() {
        if (navigator.onLine) {
            // При монтировании можно загрузить популярные фильмы или ничего не загружать
            // this.getMoviesCard();
        } else {
            this.setState({ loading: false })
        }
    }

    getMoviesCard = async (query = '', page = 1) => {
        if (!query) {
            this.setState({ movies: [], loading: false })
            return
        }

        this.setState({ loading: true, error: false })

        try {
            const data = await this.movieServices.fetchMovies(query, page)
            this.setState({
                movies: data.results,
                loading: false,
                totalPages: data.total_pages,
            })
        } catch (error) {
            this.setState({ error: true, loading: false })
        }
    }

    handleSearchChange = (e) => {
        const query = e.target.value
        this.setState({ query, currentPage: 1 })
        this.debouncedFetchMovies(query, 1)
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
        this.getMoviesCard(this.state.query, page)
    }

    render() {
        const { movies, loading, error, query, currentPage, totalPages } = this.state

        if (!navigator.onLine) {
            return (
                <Offline>
                    <p>❌ Нет подключения к интернету. Пожалуйста, проверьте ваше соединение.</p>
                </Offline>
            )
        }

        if (error) {
            return <p>Ошибка при загрузке данных</p>
        }

        return (
            <Online>
                <div style={{ padding: '24px' }}>
                    <Input
                        placeholder="Type to search..."
                        value={query}
                        onChange={this.handleSearchChange}
                        style={{ marginBottom: '24px' }}
                    />

                    {(() => {
                        if (loading) {
                            return <Spinner />
                        }

                        if (!loading && movies.length === 0 && query) {
                            return <Empty description="Ничего не найдено" />
                        }

                        if (!loading && movies.length > 0) {
                            return (
                                <>
                                    <Row gutter={[16, 16]}>
                                        {movies.map((movie) => (
                                            <Col key={movie.id} xs={24} sm={12} md={12} lg={12}>
                                                <Card
                                                    hoverable
                                                    style={{ width: '100%' }}
                                                    bodyStyle={{ padding: '0' }} // Убираем внутренние отступы у Card
                                                >
                                                    <Row>
                                                        {/* Левая часть: изображение */}
                                                        <Col span={8}>
                                                            <img
                                                                alt={movie.title}
                                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </Col>
                                                        {/* Правая часть: текст */}
                                                        <Col span={16} style={{ padding: '24px' }}>
                                                            <Meta
                                                                title={movie.title}
                                                                description={
                                                                    <>
                                                                        <p>
                                                                            {movie.release_date
                                                                                ? format(
                                                                                      new Date(movie.release_date),
                                                                                      'MMMM d, yyyy'
                                                                                  )
                                                                                : 'Unknown'}
                                                                        </p>
                                                                        <p>Action</p>
                                                                        <p>{shortenTextByWords(movie.overview, 25)}</p>
                                                                    </>
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Pagination
                                        current={currentPage}
                                        total={totalPages * 10} // totalPages * 10, так как API возвращает общее количество страниц
                                        onChange={this.handlePageChange}
                                        style={{ marginTop: '24px', textAlign: 'center' }}
                                    />
                                </>
                            )
                        }

                        return null
                    })()}
                </div>
            </Online>
        )
    }
}

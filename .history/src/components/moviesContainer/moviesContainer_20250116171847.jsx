import React, { Component } from 'react'
import { Empty } from 'antd'
import MovieServices from '../../services/services'
import { debounce } from 'lodash'
import MoviesList from '../MoviesList/MoviesList'
import PaginationControl from '../PaginationControl/PaginationControl'
import Spinner from '../Spinner/Spinner'
import './MoviesContainer.css'

export default class MoviesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            loading: false,
            error: false,
            currentPage: 1,
            totalPages: 1,
        }
        this.movieServices = new MovieServices()
        this.debouncedFetchMovies = debounce(this.getMoviesCard, 500)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            this.debouncedFetchMovies(this.props.query, 1)
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

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
        this.getMoviesCard(this.props.query, page)
    }

    render() {
        const { movies, loading, error, currentPage, totalPages } = this.state

        if (error) {
            return <p>Ошибка при загрузке данных</p>
        }

        return (
            <div className="movies-container">
                {loading ? (
                    <Spinner />
                ) : movies.length === 0 && this.props.query ? (
                    <Empty description="Ничего не найдено" />
                ) : movies.length > 0 ? (
                    <>
                        <MoviesList movies={movies} />
                        <PaginationControl
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={this.handlePageChange}
                        />
                    </>
                ) : null}
            </div>
        )
    }
}

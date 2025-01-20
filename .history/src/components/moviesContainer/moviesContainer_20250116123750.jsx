import React, { Component } from 'react'
import { Empty } from 'antd'
import { Offline, Online } from 'react-detect-offline'
import MovieServices from '../../services/services'
import { debounce } from 'lodash'
import SearchForm from '/searchForm/searchForm'
import MoviesList from '../moviesList/moviesList'
import PaginationControl from '../pagination/pagination'
import Spinner from '../spinner/spinner'
import './moviesContainer.css'

export default class MoviesContainer extends Component {
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
                <div className="movies-container">
                    <SearchForm query={query} onSearchChange={this.handleSearchChange} />

                    {loading ? (
                        <Spinner />
                    ) : movies.length === 0 && query ? (
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
            </Online>
        )
    }
}

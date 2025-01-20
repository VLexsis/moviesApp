import React, { Component } from 'react'
import { Tabs, message } from 'antd'
import { debounce } from 'lodash'
import { Offline, Online } from 'react-detect-offline'
import SearchForm from '../searchForm/searchForm'
import MoviesList from '../moviesList/moviesList'
import PaginationControl from '../pagination/pagination'
import Spinner from '../spinner/spinner'
import MovieServices from '../../services/services'
import { GenresProvider } from '../../GenresContext/GenresContext'
import './app.css'

const { TabPane } = Tabs

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            movies: [],
            ratedMovies: [],
            loading: false,
            error: false,
            currentPage: 1,
            totalPages: 1,
            guestSessionId: null,
            genres: [],
        }

        this.movieServices = new MovieServices()
        this.getMoviesCard = debounce(this.getMoviesCard.bind(this), 500)
    }

    componentDidMount() {
        this.fetchGenres()
        this.createSession()
    }

    fetchGenres = async () => {
        try {
            const data = await this.movieServices.getGenres()
            this.setState({ genres: data.genres })
        } catch (error) {
            console.error('Ошибка при загрузке жанров:', error)
        }
    }

    createSession = async () => {
        try {
            const data = await this.movieServices.createGuestSession()
            if (data.guest_session_id) {
                this.setState({ guestSessionId: data.guest_session_id })
                message.success('Гостевая сессия успешно создана')
            } else {
                throw new Error('Не удалось получить guest_session_id')
            }
        } catch (error) {
            console.error('Ошибка при создании гостевой сессии:', error)
            message.error('Не удалось создать гостевую сессию')
            this.setState({ error: true })
        }
    }

    loadRatedMovies = async () => {
        const { guestSessionId } = this.state

        if (!guestSessionId) {
            console.error('Гостевая сессия не создана')
            return
        }

        this.setState({ loading: true, error: false })

        try {
            const data = await this.movieServices.getRatedMovies(guestSessionId)
            this.setState({ ratedMovies: data.results })
        } catch (error) {
            console.error('Ошибка при загрузке оцененных фильмов:', error)
            this.setState({ error: true })
        } finally {
            this.setState({ loading: false })
        }
    }

    getMoviesCard = async (query, page) => {
        if (!query.trim()) {
            this.setState({ movies: [], loading: false })
            return
        }

        this.setState({ loading: true, error: false })

        try {
            const data = await this.movieServices.fetchMovies(query, page)
            this.setState({ movies: data.results, totalPages: data.total_pages })
        } catch (error) {
            console.error('Ошибка при загрузке фильмов:', error)
            this.setState({ error: true })
        } finally {
            this.setState({ loading: false })
        }
    }

    handleSearchChange = (e) => {
        const query = e.target.value
        this.setState({ query, currentPage: 1 }, () => {
            if (query.trim()) {
                this.getMoviesCard(query, this.state.currentPage)
            } else {
                this.setState({ movies: [] })
            }
        })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page }, () => {
            this.getMoviesCard(this.state.query, this.state.currentPage)
        })
    }

    render() {
        const { query, movies, ratedMovies, loading, currentPage, totalPages, guestSessionId, genres } = this.state

        return (
            <GenresProvider value={genres}>
                <section className="movies-app">
                    <Offline>
                        <div className="offline-message">
                            ❌ Нет подключения к интернету. Пожалуйста, проверьте ваше соединение.
                        </div>
                    </Offline>
                    <Online>
                        <Tabs
                            defaultActiveKey="1"
                            className="movies-app__tabs"
                            onTabClick={(key) => {
                                if (key === '2') {
                                    this.loadRatedMovies()
                                }
                            }}
                            destroyInactiveTabPane
                        >
                            <TabPane tab="Search" key="1">
                                <SearchForm query={query} onSearchChange={this.handleSearchChange} />
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <MoviesList
                                            movies={movies || []}
                                            guestSessionId={guestSessionId}
                                            genres={genres}
                                        />
                                        {query && (
                                            <section></section>
                                            <PaginationControl
                                                style={{ margin: '0 auto' }}
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={this.handlePageChange}
                                            />
                                        )}
                                    </>
                                )}
                            </TabPane>
                            <TabPane tab="Rated" key="2">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <MoviesList movies={ratedMovies} guestSessionId={guestSessionId} />
                                )}
                            </TabPane>
                        </Tabs>
                    </Online>
                </section>
            </GenresProvider>
        )
    }
}

export default App

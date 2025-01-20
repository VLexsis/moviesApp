import React, { useState, useEffect, useCallback } from 'react'
import { Tabs, Empty, Alert, message } from 'antd'
import { debounce } from 'lodash'
import { Offline, Online } from 'react-detect-offline'
import SearchForm from '../searchForm/searchForm'
import MoviesList from '../moviesList/moviesList'
import PaginationControl from '../pagination/pagination'
import Spinner from '../spinner/spinner'
import MovieServices from '../../services/services'
import './app.css'

const { TabPane } = Tabs

const App = () => {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [ratedMovies, setRatedMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [guestSessionId, setGuestSessionId] = useState(null)

    const movieServices = new MovieServices()

    useEffect(() => {
        const createSession = async () => {
            try {
                const data = await movieServices.createGuestSession()
                if (data.guest_session_id) {
                    setGuestSessionId(data.guest_session_id)
                    message.success('Гостевая сессия успешно создана')
                } else {
                    throw new Error('Не удалось получить guest_session_id')
                }
            } catch (error) {
                console.error('Ошибка при создании гостевой сессии:', error)
                message.error('Не удалось создать гостевую сессию')
                setError(true)
            }
        }

        createSession()
    }, [])

    // Загрузка оцененных фильмов
    const loadRatedMovies = async () => {
        if (!guestSessionId) {
            console.error('Гостевая сессия не создана')
            return
        }

        setLoading(true)
        setError(false)

        try {
            const data = await movieServices.getRatedMovies(guestSessionId)
            setRatedMovies(data.results)
        } catch (error) {
            console.error('Ошибка при загрузке оцененных фильмов:', error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    // Поиск фильмов
    const getMoviesCard = useCallback(
        debounce(async (query, page) => {
            if (!query.trim()) {
                setMovies([])
                setLoading(false)
                return
            }

            setLoading(true)
            setError(false)

            try {
                const data = await movieServices.fetchMovies(query, page)
                setMovies(data.results)
                setTotalPages(data.total_pages)
            } catch (error) {
                console.error('Ошибка при загрузке фильмов:', error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }, 500),
        []
    )

    useEffect(() => {
        if (query.trim()) {
            getMoviesCard(query, currentPage)
        } else {
            setMovies([])
        }
    }, [query, currentPage, getMoviesCard])

    const handleSearchChange = (e) => {
        setQuery(e.target.value)
        setCurrentPage(1)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
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
                            loadRatedMovies()
                        }
                    }}
                >
                    <TabPane tab="Search" key="1">
                        <SearchForm query={query} onSearchChange={handleSearchChange} />
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <Alert
                                message="Ошибка"
                                description="Не удалось загрузить данные. Пожалуйста, попробуйте позже."
                                type="error"
                                showIcon
                            />
                        ) : movies.length === 0 && query ? (
                            <Empty description="Ничего не найдено" />
                        ) : (
                            <>
                                <MoviesList movies={movies || []}  />
                                {query && (
                                    <PaginationControl
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        )}
                    </TabPane>
                    <TabPane tab="Rated" key="2">
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <Alert
                                message="Ошибка"
                                description="Не удалось загрузить оцененные фильмы."
                                type="error"
                                showIcon
                            />
                        ) : ratedMovies.length === 0 ? (
                            <Empty description="Нет оцененных фильмов" />
                        ) : (
                            <MoviesList movies={ratedMovies} />
                        )}
                    </TabPane>
                </Tabs>
            </Online>
        </section>
    )
}

export default App

import React, { useState, useEffect } from 'react'
import { Tabs, Empty } from 'antd'
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
    const [query, setQuery] = useState('') // Состояние для поискового запроса
    const [movies, setMovies] = useState([]) // Состояние для списка фильмов
    const [ratedMovies, setRatedMovies] = useState([]) // Состояние для оцененных фильмов
    const [loading, setLoading] = useState(false) // Состояние для загрузки
    const [error, setError] = useState(false) // Состояние для ошибки
    const [currentPage, setCurrentPage] = useState(1) // Текущая страница
    const [totalPages, setTotalPages] = useState(1) // Общее количество страниц
    const [guestSessionId, setGuestSessionId] = useState(null) // Состояние для guest_session_id

    const movieServices = new MovieServices()

    // Создаем гостевую сессию при монтировании компонента
    useEffect(() => {
        const createSession = async () => {
            try {
                const data = await movieServices.createGuestSession()
                setGuestSessionId(data.guest_session_id) // Сохраняем guest_session_id
                console.log('Гостевая сессия создана:', data.guest_session_id)
            } catch (error) {
                console.error('Ошибка при создании гостевой сессии:', error)
            }
        }

        createSession()
    }, [])

    // Загружаем оцененные фильмы при переключении на вкладку Rated
    const loadRatedMovies = async () => {
        if (!guestSessionId) return

        setLoading(true)
        setError(false)

        try {
            const data = await movieServices.getRatedMovies(guestSessionId)
            setRatedMovies(data.results)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    // Функция для поиска фильмов
    const getMoviesCard = debounce(async (query, page) => {
        if (!query) {
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
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }, 500)

    // При изменении query или currentPage выполняем поиск
    useEffect(() => {
        getMoviesCard(query, currentPage)
    }, [query, currentPage])

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        setQuery(e.target.value)
        setCurrentPage(1) // Сбрасываем страницу на первую при новом поиске
    }

    // Обработчик изменения страницы
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
                <Tabs defaultActiveKey="1" onChange={loadRatedMovies}>
                    <TabPane tab="Search" key="1">
                        <SearchForm query={query} onSearchChange={handleSearchChange} />
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <p>Ошибка при загрузке данных</p>
                        ) : movies.length === 0 && query ? (
                            <Empty description="Ничего не найдено" />
                        ) : (
                            <>
                                <MoviesList movies={movies} />
                                {query && ( // Пагинация отображается только при наличии запроса
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
                            <p>Ошибка при загрузке данных</p>
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

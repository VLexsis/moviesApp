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

    // Создаем гостевую сессию
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

    // Остальной код...
}

export default App
import React, { createContext, useState, useEffect } from 'react'

// Создаем контекст для жанров
export const GenresContext = createContext()

export const GenresProvider = ({ children }) => {
    const [genres, setGenres] = useState([])
    // Загрузка списка жанров при старте приложения
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                // Замените на ваш API-запрос для получения списка жанров
                const response = await fetch('https://api.example.com/genres')
                const data = await response.json()
                setGenres(data.genres) // Предположим, что API возвращает объект с полем `genres`
            } catch (error) {
                console.error('Ошибка при загрузке жанров:', error)
            }
        }

        fetchGenres()
    }, [])

    return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
}

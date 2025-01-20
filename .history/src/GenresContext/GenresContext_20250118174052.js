import React from 'react'

const GenresContext = React.createContext()

export const GenresProvider = GenresContext.Provider
export const GenresConsumer = GenresContext.Consumer

export default GenresContext

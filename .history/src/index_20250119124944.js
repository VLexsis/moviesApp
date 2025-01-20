import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app'
import { GenresProvider } from './GenresContext/GenresContext'

const root = createRoot(document.getElementById('root'))
root.render(
    <GenresProvider value={[]}>
        <App />
    </GenresProvider>
)

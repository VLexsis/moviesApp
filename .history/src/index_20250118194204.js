import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app'
import { GenresProvide r} from './GenresContext/GenresContext'

const root = createRoot(document.getElementById('root'))
root.render(
<GenresProviderr>
<App />
</GenresProviderr>
)

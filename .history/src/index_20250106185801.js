
import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './components/app/app'

const root = createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(<App />);






/*
const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
*/
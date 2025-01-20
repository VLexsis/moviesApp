iimport React from 'react';
import { createRoot } from 'react-dom/client';
import MoviesContainer from './components/movies-container/MoviesContainer'; // Импортируем MoviesContainer
import './index.css'; // Подключаем стили (если есть)

const App = () => {
    return (
        <section className="movies-app">
            <MoviesContainer /> {/* Используем MoviesContainer вместо MoviesCard */}
        </section>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
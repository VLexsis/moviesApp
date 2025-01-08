
import React from 'react'
import { createRoot } from 'react-dom/client';
import App from '../comp/app/app'

const root = createRoot(document.getElementById('root'));


root.render(<App />);






/*
const container = document.getElementById('root');
const root = createRoot(container);
root.render(< MoviesCard />);
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DatePicker } from 'antd';
import App from './/сomponentsapp/app'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
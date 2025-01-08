import React from 'react';
import { createRoot } from 'react-dom/client';
import { DatePicker } from 'antd';

const App = () => {
  return <DatePicker />;
};

export default App;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
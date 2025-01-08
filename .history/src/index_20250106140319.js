import React from 'react';
import { createRoot } from 'react-dom/client';
import { Col, Divider, Row } from 'antd';

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

const App = () => {
  return <DatePicker />;
};

export default App;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import '../node_modules/flowbite/dist/flowbite';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

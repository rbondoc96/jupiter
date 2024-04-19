// Must load these styles before the app so that app styles can override the
// base TailwindCSS styles.
import '@/styles/globals.scss';
import '@/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {Root} from '@/Root';

const rootElement = document.getElementById('root');

if (import.meta.env.DEV && rootElement === null) {
    throw new Error('Root element not found');
}

if (rootElement !== null) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Root />
        </React.StrictMode>,
    );
} else {
    const existentRootElement = document.createElement('div');
    existentRootElement.setAttribute('id', 'root');
    document.body.appendChild(existentRootElement);
    ReactDOM.createRoot(existentRootElement).render(
        <React.StrictMode>
            <Root />
        </React.StrictMode>,
    );
}

import '@/styles/index.scss';

import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

import {App} from '@/App';


ReactDOM.createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

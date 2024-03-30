import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {App} from '@/App';
import '@/styles/index.scss';

ReactDOM.createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

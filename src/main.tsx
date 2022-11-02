import '@fontsource/work-sans/100.css';
import '@fontsource/work-sans/200.css';
import '@fontsource/work-sans/300.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/work-sans/700.css';
import '@fontsource/work-sans/800.css';
import '@fontsource/work-sans/900.css';

import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {UIProvider} from '@/core/context/UIContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </StrictMode>,
);

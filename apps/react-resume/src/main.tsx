import {Font} from '@react-pdf/renderer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from '@/App';
import '@/styles/index.css';

import MontserratThin from '/fonts/Montserrat-Thin.ttf';
import MontserratLight from '/fonts/Montserrat-Light.ttf';
import MontserratRegular from '/fonts/Montserrat-Regular.ttf';
import MontserratMedium from '/fonts/Montserrat-Medium.ttf';
import MontserratSemiBold from '/fonts/Montserrat-SemiBold.ttf';
import MontserratBold from '/fonts/Montserrat-Bold.ttf';
import MontserratExtraBold from '/fonts/Montserrat-ExtraBold.ttf';
import MontserratBlack from '/fonts/Montserrat-Black.ttf';

Font.register({
    family: 'Montserrat',
    fonts: [
        {
            src: MontserratThin,
            fontWeight: 100,
        },
        {
            src: MontserratLight,
            fontWeight: 300,
        },
        {
            src: MontserratRegular,
            fontWeight: 400,
        },
        {
            src: MontserratMedium,
            fontWeight: 500,
        },
        {
            src: MontserratSemiBold,
            fontWeight: 600,
        },
        {
            src: MontserratBold,
            fontWeight: 700,
        },
        {
            src: MontserratExtraBold,
            fontWeight: 800,
        },
        {
            src: MontserratBlack,
            fontWeight: 900,
        },
    ],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
       <App />
    </React.StrictMode>,
);
    
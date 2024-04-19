import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {LandingPage} from '@/pages/LandingPage';

export const Route = createFileRoute('/')({
    component: () => (
        <Suspense>
            <LandingPage />
        </Suspense>
    ),
});
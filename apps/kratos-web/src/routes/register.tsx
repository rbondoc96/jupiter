import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {RegisterPage} from '@/pages/RegisterPage';

export const Route = createFileRoute('/register')({
    component: () => (
        <Suspense>
            <RegisterPage />
        </Suspense>
    ),
});
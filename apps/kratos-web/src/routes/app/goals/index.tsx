import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {GoalsMainPage} from '@/pages/GoalsMainPage';

export const Route = createFileRoute('/app/goals/')({
    component: () => (
        <Suspense>
            <GoalsMainPage />
        </Suspense>
    ),
});

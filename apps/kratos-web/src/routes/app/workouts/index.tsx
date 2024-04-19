import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {WorkoutsMainPage} from '@/pages/WorkoutsMainPage';

export const Route = createFileRoute('/app/workouts/')({
    component: () => (
        <Suspense>
            <WorkoutsMainPage />
        </Suspense>
    ),
});

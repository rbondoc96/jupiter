import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {ExercisesMainPage, ExercisesMainPageSkeleton} from '@/pages/ExercisesMainPage';

export const Route = createFileRoute('/app/exercises/')({
    component: () => (
        <Suspense fallback={<ExercisesMainPageSkeleton />}>
            <ExercisesMainPage />
        </Suspense>
    ),
});

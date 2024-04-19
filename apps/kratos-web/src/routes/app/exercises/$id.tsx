import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {ExerciseReadPage, ExerciseReadPageSkeleton} from '@/pages/ExerciseReadPage';

export const Route = createFileRoute('/app/exercises/$id')({
    component: () => (
        <Suspense fallback={<ExerciseReadPageSkeleton />}>
            <ExerciseReadPage />
        </Suspense>
    ),
});

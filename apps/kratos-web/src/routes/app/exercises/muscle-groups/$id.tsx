import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';
import {number, object} from 'zod';

import {ExercisesByMuscleGroupPage, ExercisesByMuscleGroupPageSkeleton} from '@/pages/ExercisesByMuscleGroupPage';

export const Route = createFileRoute('/app/exercises/muscle-groups/$id')({
    validateSearch: object({
        page: number().catch(1),
        per_page: number().catch(10),
    }),
    component: () => (
        <Suspense fallback={<ExercisesByMuscleGroupPageSkeleton />}>
            <ExercisesByMuscleGroupPage />
        </Suspense>
    ),
});

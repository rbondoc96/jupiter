import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { type ReactNode } from 'react';

import { Skeleton } from '@jupiter/react-components';

import { AppPageShell } from '@/components/AppPageShell';
import { Pagination } from '@/components/Pagination';
import { exerciseListQuery } from '@/core/queries';
import { Route as ExerciseByIdRoute } from '@/routes/app/exercises/$id';
import { Route as MuscleGroupsByIdRoute } from '@/routes/app/exercises/muscle-groups/$id';

export function ExercisesByMuscleGroupPageSkeleton(): ReactNode {
    return (
        <div>
            <Skeleton className="h-4 w-[250px]" />
            <p>Loading exercises by muscle group</p>
        </div>
    );
}

export function ExercisesByMuscleGroupPage(): ReactNode {
    const { id } = MuscleGroupsByIdRoute.useParams();
    const { page, per_page } = MuscleGroupsByIdRoute.useSearch();

    const { data: exercises } = useSuspenseQuery(
        exerciseListQuery({
            muscleGroupId: id,
            page,
            perPage: per_page,
        }),
    );

    return (
        <AppPageShell name="ExercisesByMuscleGroupPage">
            <main className="flex-1 flex flex-col px-4">
                <div className="flex flex-col gap-y-4 px-2 py-2">
                    <h2 className="text-3xl font-extrabold tracking-tight">Exercises by Muscle Group</h2>

                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                        {exercises.data.map((exercise) => (
                            <Link
                                key={`exercise-${exercise.id}`}
                                to={ExerciseByIdRoute.fullPath}
                                params={{
                                    id: exercise.id,
                                }}
                            >
                                <div className="w-36 h-36 border border-black rounded-md px-2 py-2">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col gap-y-2">
                                            {exercise.primary_muscles.length > 0 && (
                                                <span className="text-sm">
                                                    {exercise.primary_muscles.map((muscle) => muscle.name).join(', ')}
                                                </span>
                                            )}

                                            <span>{exercise.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Pagination
                        currentPage={exercises.meta.current_page}
                        lastPage={exercises.meta.last_page}
                        perPage={exercises.meta.per_page}
                        routeFullPath={MuscleGroupsByIdRoute.fullPath}
                    />
                </div>
            </main>
        </AppPageShell>
    );
}

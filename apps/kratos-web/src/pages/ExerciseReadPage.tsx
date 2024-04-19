import {useSuspenseQuery} from '@tanstack/react-query';
import {type ReactNode} from 'react';

import {Skeleton} from '@jupiter/ui-react';

import {AppPageShell} from '@/components/AppPageShell';
import {exerciseReadQuery} from '@/core/queries';
import {displayExerciseType} from '@/enums/ExerciseType';
import {Route as ExerciseReadRoute} from '@/routes/app/exercises/$id';
import {displayExerciseForce} from '@/enums/ExerciseForce';

export function ExerciseReadPageSkeleton(): ReactNode {
    return (
        <div>
            <Skeleton className="h-4 w-[250px]" />
            <p>Loading exercise...</p>
        </div>
    );
}

export function ExerciseReadPage(): ReactNode {
    const {id} = ExerciseReadRoute.useParams();

    const {data: exercise} = useSuspenseQuery(exerciseReadQuery(id));

    return (
        <AppPageShell name="ExerciseDetailPage">
            <main className="flex flex-col gap-y-4 px-6 py-6">
                <span className="text-3xl font-extrabold tracking-tight">
                    {exercise.name}
                </span>

                <span>
                    Type: {displayExerciseType(exercise.type)}
                </span>

                {exercise.target_muscle_group && (
                    <div>
                        Target Muscle Group: {exercise.target_muscle_group.name}
                    </div>
                )}

                {exercise.equipment && (
                    <div>
                        Equipment: {exercise.equipment.name}
                    </div>
                )}

                {exercise.force && (
                    <div>
                        Force: {displayExerciseForce(exercise.force)}
                    </div>
                )}

                {exercise.primary_muscles.map(muscle => (
                    <div key={muscle.id}>
                        <span>{muscle.name}</span>
                    </div>
                ))}
                
                {exercise.secondary_muscles.map(muscle => (
                    <div key={muscle.id}>
                        <span>{muscle.name}</span>
                    </div>
                ))}

                {exercise.tertiary_muscles.map(muscle => (
                    <div key={muscle.id}>
                        <span>{muscle.name}</span>
                    </div>
                ))}

                {exercise.instructions.length && (
                    <span className="text-xl font-medium">
                        Instructions
                    </span>
                )}

                {exercise.instructions.map(instruction => (
                    <div className="flex gap-x-2" key={instruction.sequence_number}>
                        <span>{instruction.sequence_number}.</span>
                        <span>{instruction.content}</span>
                    </div>
                ))}
            </main>
        </AppPageShell>
    );
}

import {Link} from '@tanstack/react-router';
import {useSuspenseQuery} from '@tanstack/react-query';
import {type ReactNode} from 'react';

import {HorizontalList, ImageWithOverlay, Skeleton} from '@jupiter/ui-react';

import {AppHeader} from '@/components/AppHeader';
import {AppPageShell} from '@/components/AppPageShell';
import {muscleGroupListQuery} from '@/core/queries';
import {Route} from '@/routes/app/exercises/muscle-groups/$id';

export function ExercisesMainPageSkeleton(): ReactNode {
    return (
        <div>
            <Skeleton className="h-4 w-[250px]" />
            <p>Loading exercises...</p>
        </div>
    );
}

export function ExercisesMainPage(): ReactNode {
    const {data: muscleGroups} = useSuspenseQuery(muscleGroupListQuery());

    return (
        <AppPageShell
            name="ExercisesMainPage"
            _mobile={{
                header: <AppHeader title="Exercises" />,
            }}
        >
            <main className="flex-1 flex flex-col px-4">
                <div className="flex flex-col relative">
                    <div className="flex flex-col gap-y-3">
                        <div>
                            <h2>
                                Exercises by Muscle Group
                            </h2>
                        </div>

                        <HorizontalList>
                            {muscleGroups.map(group => (
                                <Link
                                    key={`muscle-group-${group.id}`}
                                    to={Route.fullPath}
                                    params={{
                                        id: group.id,
                                    }}
                                    search={{
                                        page: 1,
                                        per_page: 10,
                                    }}
                                >
                                    <ImageWithOverlay
                                        alt={group.name}
                                        src={group.image_source ?? undefined}
                                    >
                                        <div className="flex-1 flex items-end mx-5 my-4">
                                            <p className="font-semibold text-white text-lg">
                                                {group.name}
                                            </p>
                                        </div>
                                    </ImageWithOverlay>
                                </Link>
                            ))}
                        </HorizontalList>
                    </div>
                </div>
            </main>
        </AppPageShell>
    );
}

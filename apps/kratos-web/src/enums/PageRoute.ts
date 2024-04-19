import {compile} from 'path-to-regexp';

import {type Exercise} from '@/parsers/exerciseParsers';

type PageRoutePathValue = number | string | undefined;

class Foo<
    TPathParams extends Record<string, PageRoutePathValue> = Record<string, PageRoutePathValue>,
    TName extends string = string,
    TPathPattern extends string = string,
> {
    public readonly key: symbol;
    public readonly pathPattern: TPathPattern;

    constructor(name: TName, pathPattern: TPathPattern) {
        this.key = Symbol(name);
        this.pathPattern = pathPattern;
    }

    public getPath(params?: TPathParams) {
        if (!params) {
            return this.pathPattern;
        }

        return compile<TPathParams>(this.pathPattern)(params);
    }
}

export const PageRoute = {
    AppExerciseDetails: new Foo<{
        exerciseId: Exercise['id'];
    }>(
        'AppExerciseDetails',
        '/app/exercises/:exerciseId',
    ),
    AppExercisesByMuscleGroup: new Foo(
        'AppExercisesByMuscleGroup',
        '/app/exercises/muscle-groups/:muscleGroupId',
    ),
    AppExercisesMain: new Foo('AppExercisesMain', '/app/exercises'),
    AppGoalsMain: new Foo('AppGoalsMain', '/app/goals'),
    AppHubMain: new Foo('AppHubMain', '/app'),
    AppMenuMain: new Foo('AppMenuMain', '/app/menu'),
    AppWorkoutsMain: new Foo('AppWorkoutsMain', '/app/workouts'),
    Landing: new Foo('Landing', '/'),
    Login: new Foo('Login', '/login'),
    Register: new Foo('Register', '/register'),
} as const;

export type PageRoute = typeof PageRoute[keyof typeof PageRoute];

export function isPageRoute(value: string): value is PageRoute {
    const pathname = value.split('?')[0];

    return Object.values(PageRoute).includes(pathname as PageRoute);
}

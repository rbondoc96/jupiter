import {queryOptions} from '@tanstack/react-query';

import {AuthAPI, ExerciseApi, MuscleApi, MuscleGroupApi} from '@/api';
import {type Exercise} from '@/parsers/exerciseParsers';
import {type Muscle} from '@/parsers/muscleParser';

export const exerciseReadQuery = (id: Exercise['id']) => queryOptions({
    queryKey: ['exercise', 'read', id],
    queryFn: () => ExerciseApi.readExercise(id),
});

export const exerciseListQuery = (params: ExerciseApi.ExerciseListQueryParams = {}) => queryOptions({
    queryKey: ['exercise', 'list', params] as const,
    queryFn: () => ExerciseApi.listExercises(params),
});

export const muscleGroupListQuery = () => queryOptions({
    queryKey: ['muscleGroup', 'list'] as const,
    queryFn: () => MuscleGroupApi.listMuscleGroups(),
});

export const muscleListQuery = () => queryOptions({
    queryKey: ['muscle', 'list'],
    queryFn: () => MuscleApi.listMuscles(),
});

export const muscleReadQuery = (id: Muscle['id']) => queryOptions({
    queryKey: ['muscle', 'read', id],
    queryFn: () => MuscleApi.readMuscle(id),
});

export const userFetchQuery = () => queryOptions({
    queryKey: ['user', 'read'] as const,
    queryFn: () => AuthAPI.fetchUser(),
});

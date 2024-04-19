import {compile} from 'path-to-regexp';

import {createClient} from '@/api/client';
import {
    type Exercise,
    exerciseListParser,
    exerciseReadParser,
    type PaginatedExerciseList,
} from '@/parsers/exerciseParsers';
// import {delay} from '@/utilities/delay';

const exerciseListRoute = compile('api/exercises');
const exerciseReadRoute = compile<{
    id: Exercise['id'];
}>('api/exercises/:id');

export type ExerciseListQueryParams = {
    muscleGroupId?: string;
    page?: number;
    perPage?: number;
};

export async function listExercises(
    params: ExerciseListQueryParams,
): Promise<PaginatedExerciseList> {
    const client = createClient();

    const queryParams = new URLSearchParams();

    if (params.page) {
        queryParams.append('page', String(params.page));
    }

    if (params.perPage) {
        queryParams.append('per_page', String(params.perPage));
    }

    if (params.muscleGroupId) {
        queryParams.append('muscle_group', String(params.muscleGroupId));
    }

    const data = await client.get(`${exerciseListRoute()}?${queryParams.toString()}`).json();

    return exerciseListParser.parse(data);
}

export async function readExercise(
    id: string,
): Promise<Exercise> {
    const client = createClient();

    const data = await client.get(exerciseReadRoute({id})).json();

    return exerciseReadParser.parse(data).data;
}

import {compile} from 'path-to-regexp';

import {delay} from '@jupiter/ui-react/utilities';

import {createClient} from '@/api/client';
import {type MuscleGroup, muscleGroupListParser} from '@/parsers/muscleGroupParser';

const muscleGroupListRoute = compile('api/muscle-groups');

export async function listMuscleGroups(): Promise<MuscleGroup[]> {
    const client = createClient();

    const data = await client.get(muscleGroupListRoute()).json();

    await delay(1000);

    return muscleGroupListParser.parse(data).data;
}

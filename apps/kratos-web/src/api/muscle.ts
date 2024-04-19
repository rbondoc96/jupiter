import {compile} from 'path-to-regexp';

import {createClient} from '@/api/client';
import {
    type Muscle,
    muscleListParser,
    muscleReadParser,
    type SimplifiedMuscle,
} from '@/parsers/muscleParser';

const muscleListRoute = compile('api/muscles');
const muscleReadRoute = compile<{
    id: Muscle['id'];
}>('api/muscles/:id');

export async function listMuscles(): Promise<SimplifiedMuscle[]> {
    const client = createClient();

    const data = await client.get(muscleListRoute()).json();

    return muscleListParser.parse(data).data;
}

export async function readMuscle(id: Muscle['id']): Promise<Muscle> {
    const client = createClient();

    const data = await client.get(muscleReadRoute({id})).json();

    return muscleReadParser.parse(data).data;
}

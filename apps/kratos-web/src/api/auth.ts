import {DateTime} from 'luxon';

import {delay} from '@jupiter/ui-react/utilities';

import {createClient} from '@/api/client';
import type Gender from '@/enums/Gender';
import {type User, userParser} from '@/parsers/authParsers';

export const fetchUser = async (): Promise<User> => {
    const client = createClient();

    const data = await client.get('api/auth').json();

    return userParser.parse(data).data;
};

export type LoginUserPayload = {
    email: string;
    password: string;
};

export const login = async (payload: LoginUserPayload): Promise<User> => {
    const client = createClient();

    await delay(2000);

    const data = await client.post('api/auth', {
        json: payload,
    }).json();

    return userParser.parse(data).data;
};

export const logout = async (): Promise<void> => {
    const client = createClient();

    await client.delete('api/auth');
};

export type RegisterUserPayload = {
    birthday: Date;
    email: string;
    first_name: string;
    last_name: string;
    gender: Gender;
    password: string;
    password_confirm: string;
};

export const register = async (payload: RegisterUserPayload): Promise<User> => {
    const client = createClient();

    const birthday = DateTime.fromJSDate(payload.birthday).toFormat('yyyy-MM-dd');

    const data = await client.post('api/auth/register', {
        json: {
            ...payload,
            birthday,
        }
    }).json();

    return userParser.parse(data).data;
};

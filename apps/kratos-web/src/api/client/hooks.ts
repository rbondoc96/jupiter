import {type BeforeErrorHook, type BeforeRequestHook} from 'ky';

import {RequestError} from '@/errors/RequestError';
import {errorResponseParser} from '@/parsers/responseParsers';

export const debugRequest: BeforeRequestHook = (request) => {
    if (import.meta.env.DEV) {
        console.info(`[${request.method}] Requesting ${request.url}`);
    }
};

export const convertToRequestError: BeforeErrorHook = async (error) => {
    const {response} = error;

    if (import.meta.env.DEV) {
        console.error(`[${response.status}] ${response.url}`);
    }

    const parseResult = errorResponseParser.safeParse(await response.json());

    if (parseResult.success) {
        return new RequestError(parseResult.data, error);
    }

    return error;
};

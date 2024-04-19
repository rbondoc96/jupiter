import ky, {type KyInstance, type Options as KyOptions} from 'ky';

import {convertToRequestError, debugRequest} from '@/api/client/hooks';

export function createClient(options: KyOptions = {}): KyInstance {
    return ky
        .create({
            credentials: 'include',
            hooks: {
                beforeError: [convertToRequestError],
                beforeRequest: [debugRequest],
                beforeRetry: [],
            },
            prefixUrl: import.meta.env.VITE_BASE_URL,
            retry: 0,
            timeout: 10000,
        })
        .extend(options);
}

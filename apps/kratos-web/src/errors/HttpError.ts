import {HTTPError as BaseHttpError} from 'ky';

import {type RenderableError} from '@/errors/RenderableError';

export abstract class HttpError extends BaseHttpError implements RenderableError {
    protected constructor(
        public readonly error: BaseHttpError,
        public readonly name: string,
        public readonly displayName: string,
        public readonly message: string,
    ) {
        super(error.response, error.request, error.options);
    }
}

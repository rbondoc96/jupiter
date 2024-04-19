import {HTTPError as BaseHttpError} from 'ky';

import {HttpError} from '@/errors/HttpError';

export class ValidationError extends HttpError {

}

import RequestException from '@/errors/RequestException';
import {type ErrorResponse} from '@/parsers/responseParsers';

export default class UnexpectedRequestError extends RequestException {
    public override readonly name = 'UnexpectedRequestError';

    constructor(response: ErrorResponse) {
        super('Unexpected Request Error', response);
    }
}

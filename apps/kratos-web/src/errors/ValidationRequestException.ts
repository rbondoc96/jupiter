import RequestException from '@/errors/RequestException';
import {type ErrorResponse} from '@/parsers/responseParsers';

export default class ValidationRequestException extends RequestException {
    public override readonly name = 'ValidationRequestException';

    constructor(response: ErrorResponse) {
        super('Validation Error', response);
    }
}

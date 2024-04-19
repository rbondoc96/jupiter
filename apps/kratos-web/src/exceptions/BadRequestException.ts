import RequestException from '@/exceptions/RequestException';
import {type ErrorResponse} from '@/parsers/responseParsers';

export default class BadRequestException extends RequestException {
    public override readonly name = 'BadRequestException';

    constructor(response: ErrorResponse) {
        super(response.error.name, response);
    }
}

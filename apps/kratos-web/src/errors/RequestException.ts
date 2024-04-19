import Throwable from '@/errors/Throwable';
import {type ErrorResponse} from '@/parsers/responseParsers';

export default abstract class RequestException extends Throwable {
    public abstract override readonly name: string;
    public readonly messages: string[];

    constructor(displayName: string, protected readonly response: ErrorResponse) {
        const message = response.error.message
            ?? 'No error message provided. Please contact support.';

        super(displayName, message);

        this.messages = response.error.errors === undefined
            ? []
            : Object.values(response.error.errors).flat();
    }
}

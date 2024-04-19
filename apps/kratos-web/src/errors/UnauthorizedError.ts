import {Throwable} from '@/errors/Throwable';

export class UnauthorizedError extends Throwable {
    public override readonly name = 'UnauthorizedError';

    constructor() {
        super('Unauthorized', 'You are not authorized to perform this action.');
    }
}

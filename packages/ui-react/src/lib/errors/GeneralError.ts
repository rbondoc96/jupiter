import {AlertableError, type AlertableErrorContext} from '@/lib/errors/AlertableError';

export class GeneralError extends AlertableError {
    constructor(
        public readonly name: string,
        readonly message: string,
    ) {
        super(message);
    }

    toFormAlertContext(): AlertableErrorContext {
        return {
            message: this.message,
            title: this.name,
        };
    }

    public static fromError(error: Error): GeneralError {
        return new GeneralError(error.name, error.message);
    }

    public static fromUnknownError(error: unknown): GeneralError {
        if (error instanceof Error) {
            return GeneralError.fromError(error);
        }

        if (!(typeof error === 'object')) {
            return new GeneralError('Unknown Error', String(error));
        } else {
            return new GeneralError('Unknown Error', JSON.stringify(error));
        }
    }
}

import { HTTPError } from 'ky';

import { type AlertContext } from '@jupiter/react-components';

import { type ErrorResponse } from '@/parsers/responseParsers';

export class RequestError extends HTTPError {
    public readonly status: number;
    public readonly name: string;
    public readonly messages: string[];

    constructor(errorResponse: ErrorResponse, baseError: HTTPError) {
        super(baseError.response, baseError.request, baseError.options);

        this.message = errorResponse.error.message;
        this.name = errorResponse.error.name;
        this.status = baseError.response.status;

        this.messages =
            errorResponse.error.errors === undefined ? [] : Object.values(errorResponse.error.errors).flat();
    }

    public toAlertContext(): AlertContext {
        return {
            type: 'error',
            title: this.name,
            description: this.message,
            descriptionItems: this.messages,
        };
    }
}

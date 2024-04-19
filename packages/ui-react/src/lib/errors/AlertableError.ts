export type AlertableErrorContext = {
    message: string;
    messages?: string[];
    title: string;
};

export abstract class AlertableError extends Error {
    abstract readonly name: string;
    abstract toFormAlertContext(): AlertableErrorContext;
}

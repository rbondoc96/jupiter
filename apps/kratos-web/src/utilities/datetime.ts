import {DateTime} from 'luxon';

export function fromIsoString(iso: string | null | undefined): DateTime<true> | undefined {
    if (!iso) {
        return undefined;
    }

    const dateTime = DateTime.fromISO(iso);

    if (!dateTime.isValid) {
        return undefined;
    }

    return dateTime;
}
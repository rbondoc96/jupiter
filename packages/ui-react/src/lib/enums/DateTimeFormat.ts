/**
 * Tokens taken from Luxon docs
 * @see {@link https://moment.github.io/luxon/#/formatting?id=table-of-tokens}
 */
const DateTimeFormat = {
    /** Example: April 29th, 1453 */
    LongLocalizedDate: 'DDD',
    /** Example: 01/04/1990 */
    ShortPaddedDate: 'MM/dd/yyyy',
} as const;

type DateTimeFormat = typeof DateTimeFormat[keyof typeof DateTimeFormat];

export {DateTimeFormat};

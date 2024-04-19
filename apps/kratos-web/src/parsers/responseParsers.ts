import {
    array,
    boolean,
    literal,
    number,
    object,
    optional,
    type output,
    record,
    string,
    type ZodType,
} from 'zod';

export const errorResponseParser = object({
    success: literal(false),
    error: object({
        name: string(),
        message: string(),
        errors: optional(record(string(), array(string()))),
    }),
});

export const paginatedResponseMetaParser = object({
    current_page: number(),
    last_page: number(),
    per_page: number(),
    total: number(),
});

export type ErrorResponse = output<typeof errorResponseParser>;

export function createGetResponseParser<TParser extends ZodType>(parser: TParser): ZodType {
    return object({
        success: boolean(),
        data: parser,
    });
}

type ListResponseParserOutput<TParser extends ZodType> = {
    data: output<TParser>[];
    meta: output<typeof paginatedResponseMetaParser>;
};

export function createListResponseParser<TParser extends ZodType>(parser: TParser): ZodType {
    return object({
        success: boolean(),
        data: array(parser),
    });
}

export function createPaginatedListResponseParser<TParser extends ZodType>(
    parser: TParser,
): ZodType<ListResponseParserOutput<TParser>> {
    return object({
        success: boolean(),
        data: array(parser),
        meta: paginatedResponseMetaParser,
    }).transform((raw) => ({
        data: raw.data,
        meta: raw.meta,
    }));
}

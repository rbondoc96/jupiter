type SelectOption = {
    label: string;
    value: string;
};

export function enumToSelectOptions<TValue extends string>(
    enumObject: Record<string, TValue>,
    displayFunction: (value: TValue) => string,
): readonly SelectOption[] {
    return Object.freeze(Object.values(enumObject).map(enumValue => ({
        label: displayFunction(enumValue),
        value: enumValue,
    })));
}
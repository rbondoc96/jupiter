export type StoreAccessor<
    TStore extends Record<string, unknown>,
    TKey extends keyof TStore
> = () => TStore[TKey];

export type RecursivePartial<TObject extends object> = {
    [TKey in keyof TObject]?: TObject[TKey] extends object
        ? RecursivePartial<TObject[TKey]>
        : TObject[TKey];
};

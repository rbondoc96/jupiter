import { PaginationPrimitiveContent } from './PaginationPrimitiveContent';
import { PaginationPrimitiveFirst } from './PaginationPrimitiveFirst';
import { PaginationPrimitiveItem } from './PaginationPrimitiveItem';
import { PaginationPrimitiveLast } from './PaginationPrimitiveLast';
import { PaginationPrimitiveNext } from './PaginationPrimitiveNext';
import { PaginationPrimitivePrevious } from './PaginationPrimitivePrevious';
import { PaginationPrimitiveRoot } from './PaginationPrimitiveRoot';

type PaginationPrimitiveComponent = typeof PaginationPrimitiveRoot & {
    Content: typeof PaginationPrimitiveContent;
    First: typeof PaginationPrimitiveFirst;
    Item: typeof PaginationPrimitiveItem;
    Last: typeof PaginationPrimitiveLast;
    Next: typeof PaginationPrimitiveNext;
    Previous: typeof PaginationPrimitivePrevious;
};

export const PaginationPrimitive: PaginationPrimitiveComponent = Object.assign(PaginationPrimitiveRoot, {
    Content: PaginationPrimitiveContent,
    First: PaginationPrimitiveFirst,
    Item: PaginationPrimitiveItem,
    Last: PaginationPrimitiveLast,
    Next: PaginationPrimitiveNext,
    Previous: PaginationPrimitivePrevious,
});

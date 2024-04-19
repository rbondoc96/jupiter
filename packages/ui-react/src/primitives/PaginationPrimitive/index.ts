import {PaginationPrimitiveContent} from '@/primitives/PaginationPrimitive/PaginationPrimitiveContent';
import {PaginationPrimitiveFirst} from '@/primitives/PaginationPrimitive/PaginationPrimitiveFirst';
import {PaginationPrimitiveItem} from '@/primitives/PaginationPrimitive/PaginationPrimitiveItem';
import {PaginationPrimitiveLast} from '@/primitives/PaginationPrimitive/PaginationPrimitiveLast';
import {PaginationPrimitiveNext} from '@/primitives/PaginationPrimitive/PaginationPrimitiveNext';
import {PaginationPrimitivePrevious} from '@/primitives/PaginationPrimitive/PaginationPrimitivePrevious';
import {PaginationPrimitiveRoot} from '@/primitives/PaginationPrimitive/PaginationPrimitiveRoot';

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

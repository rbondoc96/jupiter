import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faChevronLeft,
    faChevronRight,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@tanstack/react-router';
import {type FunctionComponent} from 'react';

import {PaginationPrimitive} from '@jupiter/ui-react/primitives';

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    routeFullPath: string;
};

export const Pagination: FunctionComponent<PaginationProps> = ({
    currentPage,
    lastPage,
    perPage,
    routeFullPath,
}) => {
    return (
        <PaginationPrimitive>
            <PaginationPrimitive.Content>
                <PaginationPrimitive.First
                    icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                >
                    <Link
                        className="aria-disabled:text-muted-foreground"
                        disabled={currentPage === 1}
                        preload={false}
                        from={routeFullPath}
                        search={{
                            page: 1,
                            per_page: perPage,
                        }}
                    />
                </PaginationPrimitive.First>
                <PaginationPrimitive.Previous
                    icon={<FontAwesomeIcon icon={faChevronLeft} />}
                >
                    <Link
                        className="aria-disabled:text-muted-foreground"
                        disabled={currentPage === 1}
                        preload={false}
                        from={routeFullPath}
                        search={{
                            page: currentPage - 1,
                            per_page: perPage,
                        }}
                    />
                </PaginationPrimitive.Previous>

                <PaginationPrimitive.Item>
                    <Link
                        className="aria-disabled:text-muted-foreground"
                        disabled={currentPage === 1}
                        preload={false}
                        from={routeFullPath}
                        search={{
                            page: 1,
                            per_page: perPage,
                        }}
                    >
                        1
                    </Link>
                </PaginationPrimitive.Item>

                {(currentPage + 2) < lastPage && (
                    <PaginationPrimitive.Item>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </PaginationPrimitive.Item>
                )}

                <PaginationPrimitive.Item>
                    <Link
                        className="aria-disabled:text-muted-foreground"
                        disabled={currentPage === lastPage}
                        preload={false}
                        from={routeFullPath}
                        search={{
                            page: lastPage,
                            per_page: perPage,
                        }}
                    >
                        {lastPage}
                    </Link>
                </PaginationPrimitive.Item>

                <PaginationPrimitive.Next
                    icon={<FontAwesomeIcon icon={faChevronRight} />}
                >
                    <Link
                        className="aria-disabled:text-muted-foreground"
                        disabled={currentPage >= lastPage}
                        preload={false}
                        from={routeFullPath}
                        search={{
                            page: currentPage + 1,
                            per_page: perPage,
                        }}
                    />
                </PaginationPrimitive.Next>

                <PaginationPrimitive.Last
                    icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                >
                    <Link
                        className="aria-disabled:text-muted-foreground"
                        disabled={currentPage === lastPage}
                        preload={false}
                        from={routeFullPath}
                        search={{
                            page: lastPage,
                            per_page: perPage,
                        }}
                    />
                </PaginationPrimitive.Last>
            </PaginationPrimitive.Content>
        </PaginationPrimitive>
    );
};

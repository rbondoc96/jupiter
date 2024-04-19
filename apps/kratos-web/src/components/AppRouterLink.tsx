import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link as RouterLink, type LinkProps as RouterLinkProps} from '@tanstack/react-router';
import {type ReactNode} from 'react';

import {Button} from '@jupiter/ui-react';

export type AppRouterLinkClassNames = Partial<{
    active: string;
    default: string;
    icon: string;
    iconContainer: string;
    inactive: string;
}>;

export type AppRouterLinkProps = Omit<RouterLinkProps, 'className' | 'to'> & {
    classNames?: AppRouterLinkClassNames;
    icon?: IconDefinition;
    to: string;
    // to: Exclude<keyof FileRoutesByPath, '/app'>;
    onClick?: () => void;
};

export function AppRouterLink({
    children,
    classNames,
    icon,
    to,
    onClick,
    ...props
}: AppRouterLinkProps): ReactNode {
    return (
        <RouterLink
            activeProps={{
                className: classNames?.active,
            }}
            inactiveProps={{
                className: classNames?.inactive,
            }}
            className={classNames?.default}
            to={to}
            {...props}
        >
            {(context) => typeof children === 'function' ? (
                <Button
                    type="button"
                    tabIndex={-1}
                    variant="unstyled"
                    onClick={onClick}
                >
                    {icon && (
                        <div className={classNames?.iconContainer}>
                            <FontAwesomeIcon
                                className={classNames?.icon}
                                icon={icon}
                            />
                        </div>
                    )}
                    {children(context)}
                </Button>
            ) : (
                <Button
                    type="button"
                    tabIndex={-1}
                    variant="unstyled"
                    onClick={onClick}
                >
                    {icon && (
                        <div className={classNames?.iconContainer}>
                            <FontAwesomeIcon
                                className={classNames?.icon}
                                icon={icon}
                            />
                        </div>
                    )}
                    {children}
                </Button>
            )}
        </RouterLink>
    );
}

AppRouterLink.displayName = 'AppRouterLink';

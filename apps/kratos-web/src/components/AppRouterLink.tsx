import {type IconDefinition, type SizeProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link as RouterLink, type LinkProps as RouterLinkProps} from '@tanstack/react-router';
import {type ReactNode} from 'react';

import {Button} from '@jupiter/ui-react';

export type AppRouterLinkClassNames = Partial<{
    content: string;
    icon: string;
    iconPositioner: string;
    iconWrapper: string;
    root: string;
    rootActive: string;
    rootInactive: string;
}>;

export type AppRouterLinkProps = Omit<RouterLinkProps, 'className' | 'to'> & {
    classNames?: AppRouterLinkClassNames;
    icon?: IconDefinition;
    iconSize?: SizeProp;
    to: string;
    onClick?: () => void;
};

export function AppRouterLink({
    children,
    classNames,
    icon,
    iconSize,
    to,
    onClick,
    ...props
}: AppRouterLinkProps): ReactNode {
    return (
        <RouterLink
            activeProps={{
                className: classNames?.rootActive,
            }}
            activeOptions={{
                exact: true,
            }}
            inactiveProps={{
                className: classNames?.rootInactive,
            }}
            className={classNames?.root}
            to={to}
            {...props}
        >
            {(context) => typeof children === 'function' ? (
                <Button
                    type="button"
                    tabIndex={-1}
                    classNames={{
                        root: classNames?.content,
                    }}
                    variant="unstyled"
                    onClick={onClick}
                >
                    {icon && (
                        <div className={classNames?.iconPositioner}>
                            <div className={classNames?.iconWrapper}>
                                <FontAwesomeIcon
                                    className={classNames?.icon}
                                    icon={icon}
                                    size={iconSize}
                                />
                            </div>
                        </div>
                    )}
                    {children(context)}
                </Button>
            ) : (
                <Button
                    type="button"
                    tabIndex={-1}
                    classNames={{
                        root: classNames?.content,
                    }}
                    variant="unstyled"
                    onClick={onClick}
                >
                    {icon && (
                        <div className={classNames?.iconPositioner}>
                            <div className="flex justify-center items-center h-full w-full">
                                <FontAwesomeIcon
                                    className={classNames?.icon}
                                    icon={icon}
                                    size={iconSize}
                                />
                            </div>
                        </div>
                    )}
                    {children}
                </Button>
            )}
        </RouterLink>
    );
}

AppRouterLink.displayName = 'AppRouterLink';

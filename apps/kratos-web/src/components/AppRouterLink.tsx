import {type IconDefinition, type SizeProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link as RouterLink, type LinkProps as RouterLinkProps} from '@tanstack/react-router';
import {forwardRef, type PropsWithChildren} from 'react';

import {Button} from '@jupiter/react-components';
import {composeClassName} from '@jupiter/web';

export type AppRouterLinkClassNames = Partial<{
    content: string;
    contentActive: string;
    contentInactive: string;
    icon: string;
    iconActive: string;
    iconInactive: string;
    iconRoot: string;
    iconRootActive: string;
    iconRootInactive: string;
    root: string;
    rootActive: string;
    rootInactive: string;
}>;

export type AppRouterLinkProps = Omit<RouterLinkProps, 'className' | 'children' | 'to'> & {
    classNames?: AppRouterLinkClassNames;
    icon?: IconDefinition;
    iconSize?: SizeProp;
    to: string;
    onClick?: () => void;
};

export const AppRouterLink = forwardRef<HTMLAnchorElement, PropsWithChildren<AppRouterLinkProps>>(({
    children,
    classNames,
    icon,
    iconSize,
    to,
    onClick,
    ...props
}, ref) => {
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
            ref={ref}
            to={to}
            {...props}
        >
            {({isActive}) => (
                <Button
                    type="button"
                    tabIndex={-1}
                    classNames={{
                        root: composeClassName(
                            classNames?.content,
                            isActive ? classNames?.contentActive : classNames?.contentInactive,
                        ),
                    }}
                    variant="unstyled"
                    onClick={onClick}
                >
                    {icon && (
                        <div
                            className={composeClassName(
                                'h-full aspect-square',
                                classNames?.iconRoot,
                                isActive ? classNames?.iconRootActive : classNames?.iconRootInactive,
                            )}
                        >
                            <div className="flex justify-center items-center h-full w-full">
                                <FontAwesomeIcon
                                    fixedWidth
                                    className={composeClassName(
                                        classNames?.icon,
                                        isActive ? classNames?.iconActive : classNames?.iconInactive,
                                    )}
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
});

AppRouterLink.displayName = 'AppRouterLink';

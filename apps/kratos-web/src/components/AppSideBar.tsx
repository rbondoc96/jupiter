import {faChartLine, faDumbbell, faEllipsis, faHome, faWeightHanging, faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useSuspenseQuery} from '@tanstack/react-query';
// import {useRouterState} from '@tanstack/react-router';
// import {motion} from 'framer-motion';
import {forwardRef, useRef, useState} from 'react';

import {Avatar} from '@jupiter/react-components';
import {SheetPrimitive} from '@jupiter/react-primitives';
import {composeClassName} from '@jupiter/web';

import userImage from '@/assets/images/user.png';
import {AppRouterLink} from '@/components/AppRouterLink';
import {Logo} from '@/components/Logo';
import {userFetchQuery} from '@/core/queries';

const navLinks = [
    {children: 'Home', icon: faHome, route: '/app'},
    {children: 'Exercises', icon: faDumbbell, route: '/app/exercises'},
    {children: 'Workouts', icon: faWeightHanging, route: '/app/workouts'},
    {children: 'Goals', icon: faChartLine, route: '/app/goals'},
    {children: 'Menu', icon: faEllipsis, route: '/app/menu'},
] as const;

export const AppSideBar = forwardRef<HTMLDivElement>((_props, ref) => {
    const {data: user} = useSuspenseQuery(userFetchQuery());
    const [isExpanded, setIsExpanded] = useState(false);

    // const routerState = useRouterState();

    // const computedActiveIndex = useMemo(
    //     () => Math.max(
    //         0,
    //         navLinks.findIndex(({route}) => route.includes(routerState.location.pathname)),
    //     ),
    //     [routerState.location.pathname],
    // );

    const linkContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative h-screen z-10" ref={ref}>
            <div className="absolute right-0 top-7 translate-x-1/2">
                <SheetPrimitive open={isExpanded} onOpenChange={setIsExpanded}>
                    <SheetPrimitive.Trigger
                        className={composeClassName(
                            'flex items-center justify-center',
                            'border border-black rounded-full',
                            'h-3 aspect-square',
                            'p-2',
                            'bg-white',
                        )}
                    >
                        <FontAwesomeIcon
                            icon={faX}
                            size="xs"
                        />
                    </SheetPrimitive.Trigger>

                    <SheetPrimitive.Content side="left" className="w-[270px] px-6 py-5">
                        <div className="h-full flex flex-col justify-between">
                            <div className="flex flex-col gap-y-8">
                                <div>
                                    <Logo />
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    {navLinks.map(navLink => (
                                        <AppRouterLink
                                            key={`app-side-bar-${navLink.route}`}
                                            icon={navLink.icon}
                                            iconSize="1x"
                                            classNames={{
                                                content: 'relative flex flex-row items-center gap-x-4 h-full w-full text-foreground',
                                                contentActive: 'font-semibold',
                                                contentInactive: 'text-primary',
                                                icon: 'text-primary',
                                                iconActive: 'text-white',
                                                iconRoot: 'p-2 rounded-md',
                                                iconRootActive: 'bg-primary',
                                                root: 'group rounded-md flex-1 hover:bg-primary/50',
                                                rootActive: '',
                                            }}
                                            to={navLink.route}
                                            params={{}}
                                            onClick={() => setIsExpanded(false)}
                                        >
                                            <span className="text-sm">
                                                {navLink.children}
                                            </span>
                                        </AppRouterLink>
                                    ))}
                                </div>
                            </div>

                            <div className="flex">
                                <Avatar
                                    alt={user.name.full}
                                    fallback="Fallback"
                                    src={userImage}
                                />
                            </div>
                        </div>
                    </SheetPrimitive.Content>
                </SheetPrimitive>
            </div>

            <div className="h-full flex flex-col bg-black/10">
                <div className="flex-1 px-6 py-5">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-y-8 justify-center items-center">
                            <div>
                                <Logo />
                            </div>

                            <div
                                className="relative flex flex-col gap-y-4 rounded-full"
                                ref={linkContainerRef}
                            >
                                {navLinks.map(navLink => (
                                    <AppRouterLink
                                        key={`app-side-bar-${navLink.route}`}
                                        icon={navLink.icon}
                                        iconSize="1x"
                                        classNames={{
                                            content: 'relative flex flex-row justify-center items-center h-full w-full group-hover:text-white',
                                            contentActive: 'text-white',
                                            contentInactive: 'text-primary',
                                            icon: 'group-hover:text-white',
                                            iconActive: 'text-white',
                                            iconRoot: 'h-full aspect-square',
                                            root: 'group rounded-md flex-1 p-2 hover:bg-primary/50',
                                            rootActive: 'bg-primary',
                                        }}
                                        to={navLink.route}
                                        params={{}}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <Avatar
                                alt={user.name.full}
                                fallback="Fallback"
                                src={userImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

AppSideBar.displayName = 'AppSideBar';

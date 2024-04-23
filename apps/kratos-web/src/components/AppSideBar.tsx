import {faChartLine, faDumbbell, faEllipsis, faHome, faWeightHanging} from '@fortawesome/free-solid-svg-icons';
import {useSuspenseQuery} from '@tanstack/react-query';
// import {useRouterState} from '@tanstack/react-router';
// import {motion} from 'framer-motion';
import {forwardRef, useRef} from 'react';

import {Avatar} from '@jupiter/ui-react';

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
        <div className="fixed left-0 h-screen z-10" ref={ref}>
            <div className="h-full flex flex-col">
                <div className="flex-1 px-4 py-5">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-center items-center">
                            <Logo />
                        </div>
                        <div className="relative flex">
                            <div
                                // The compressed version of the sidebar
                                className="absolute inset-0"
                                ref={linkContainerRef}
                            >
                                <div className="relative h-full">
                                    {navLinks.map(navLink => (
                                        <AppRouterLink
                                            key={`app-side-bar-${navLink.route}`}
                                            icon={navLink.icon}
                                            iconSize="1x"
                                            classNames={{
                                                content: 'relative flex flex-row h-full w-full',
                                                icon: 'text-primary',
                                                iconActive: 'text-primary-foreground',
                                                iconPositioner: '',
                                                root: 'rounded-full flex-1',
                                                rootActive: 'bg-primary',
                                            }}
                                            to={navLink.route}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div
                                // The expanded version of the sidebar
                                className="relative flex flex-col gap-y-4 rounded-full"
                                ref={linkContainerRef}
                            >
                                {navLinks.map(navLink => (
                                    <AppRouterLink
                                        key={`app-side-bar-${navLink.route}`}
                                        icon={navLink.icon}
                                        iconSize="1x"
                                        classNames={{
                                            content: 'relative flex flex-row items-center gap-x-4 h-full w-full',
                                            contentActive: 'text-white',
                                            contentInactive: 'text-primary',
                                            iconActive: 'text-white',
                                            iconPositioner: 'h-full aspect-square',
                                            root: 'rounded-full flex-1 px-5 py-3',
                                            rootActive: 'bg-primary',
                                        }}
                                        to={navLink.route}
                                    >
                                        <span className="text-sm tracking-wide">
                                            {navLink.children}
                                        </span>
                                    </AppRouterLink>
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

import {faChartLine, faDumbbell, faEllipsis, faHome, faWeightHanging} from '@fortawesome/free-solid-svg-icons';
import {useSuspenseQuery} from '@tanstack/react-query';
import {forwardRef} from 'react';

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

    return (
        <div className="fixed left-0 h-screen z-10" ref={ref}>
            <div className="h-full flex flex-col">
                <div className="flex-1 px-4 py-5">
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex justify-center items-center">
                            <Logo />
                        </div>
                        <div className="bg-slate-200 rounded-full">
                            <div className="relative px-3 py-4">
                                <div className="relative">
                                    <div className="absolute inset-0">
                                        <div className="rounded-full w-full h-full bg-red-500">

                                        </div>
                                    </div>
                                    <div className="relative flex flex-col items-center gap-y-4">
                                        {navLinks.map(navLink => (
                                            <AppRouterLink
                                                key={`app-side-bar-${navLink.route}`}
                                                icon={navLink.icon}
                                                iconSize="1x"
                                                classNames={{
                                                    content: 'relative flex flex-row h-full w-full',
                                                    icon: 'text-primary-foreground',
                                                    iconPositioner: 'absolute inset-0',
                                                    root: 'rounded-full h-10 w-10 bg-transparent overflow-hidden',
                                                    // rootActive: 'bg-primary/80',
                                                }}
                                                to={navLink.route}
                                            />
                                        ))}
                                    </div>
                                </div>
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

import {faChartLine, faDumbbell, faEllipsis, faHome, faWeightHanging} from '@fortawesome/free-solid-svg-icons';
import {useRouterState} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {type ReactNode, useMemo} from 'react';

import {AppRouterLink} from '@/components/AppRouterLink';

const navLinks = [
    {children: 'Home', end: true, icon: faHome, route: '/app'},
    {children: 'Exercises', end: false, icon: faDumbbell, route: '/app/exercises'},
    {children: 'Workouts', end: false, icon: faWeightHanging, route: '/app/workouts'},
    {children: 'Goals', end: false, icon: faChartLine, route: '/app/goals'},
    {children: 'Menu', end: false, icon: faEllipsis, route: '/app/menu'},
] as const;

export function AppTabBar(): ReactNode {
    const routerState = useRouterState();

    const computedActiveIndex = useMemo(
        () => Math.max(
            0,
            navLinks.findIndex(({route}) => route.includes(routerState.location.pathname)),
        ),
        [routerState.location.pathname],
    );

    return (
        <div className="fixed bottom-0 w-screen bg-white">
            <nav className="relative h-14 flex">
                <div className="absolute inset-x-0 border border-gray-300">
                    <motion.div
                        className="absolute transition-transform duration-100 h-0.5 border border-green"
                        initial={{
                            width: `${100 / navLinks.length}%`,
                        }}
                        animate={{
                            x: `${100 * computedActiveIndex}%`,
                        }}
                        transition={{
                            duration: 0.1,
                        }}
                    />
                </div>

                {navLinks.map(({children, icon, route}) => (
                    <AppRouterLink
                        key={`app-tab-bar-link-${route}`}
                        classNames={{
                            root: 'flex-1 flex justify-center items-center',
                        }}
                        icon={icon}
                        iconSize="1x"
                        to={route}
                        params={{}}
                    >
                        <p className="text-[0.65rem] text-center">
                            {children}
                        </p>
                    </AppRouterLink>
                ))}
            </nav>
        </div>
    );
}

export default AppTabBar;

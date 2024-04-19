import {faChartLine, faDumbbell, faEllipsis, faHome, faWeightHanging} from '@fortawesome/free-solid-svg-icons';
import {type ReactNode, useState} from 'react';

import {AppRouterLink} from '@/components/AppRouterLink';

const navLinks = [
    {children: 'Home', end: true, icon: faHome, route: '/app'},
    {children: 'Exercises', end: false, icon: faDumbbell, route: '/app/exercises'},
    {children: 'Workouts', end: false, icon: faWeightHanging, route: '/app/workouts'},
    {children: 'Goals', end: false, icon: faChartLine, route: '/app/goals'},
    {children: 'Menu', end: false, icon: faEllipsis, route: '/app/menu'},
] as const;

export function AppTabBar(): ReactNode {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="fixed bottom-0 inset-x-0 bg-white">
            <nav className="relative h-14 flex">
                <div className="absolute inset-x-0 border border-gray-300">
                    <div
                        className="absolute transition-transform duration-100 h-0.5 border border-green"
                        style={{
                            width: `${100 / navLinks.length}%`,
                            transform: `translateX(calc(100% * ${activeIndex})`,
                        }}
                    />
                </div>
                {navLinks.map(({children, icon, route}, index) => (
                    <AppRouterLink
                        key={`app-tab-bar-link-${route}`}
                        classNames={{
                            default: 'flex-1 flex justify-center items-center',
                            // icon: 'h-5 w-5',
                            // iconContainer: 'flex justify-center p-1',
                            // inner: 'flex flex-col',
                        }}
                        // end={end}
                        icon={icon}
                        to={route}
                        onClick={() => setActiveIndex(index)}
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

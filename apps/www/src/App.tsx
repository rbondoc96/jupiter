import {createRouter, RouterProvider} from '@tanstack/react-router';
import {type FunctionComponent, useEffect} from 'react';
import {useAppTheme} from '@/hooks/stores/useLocalStore';
import {routeTree} from '@/routeTree.gen';
import {applyAppTheme} from '@/utilities/theme';

const router = createRouter({routeTree});

export const App: FunctionComponent = () => {
    const appTheme = useAppTheme();

    useEffect(
        () => {
            applyAppTheme(appTheme);
        },
        [appTheme],
    );

    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
};

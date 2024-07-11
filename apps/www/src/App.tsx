import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { type FunctionComponent } from 'react';

import { routeTree } from '@/routeTree.gen';

const router = createRouter({ routeTree });

export const App: FunctionComponent = () => {
    return (
        <div className="app">
            <AnimatePresence>
                <RouterProvider router={router} />
            </AnimatePresence>
        </div>
    );
};

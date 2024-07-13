import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';
import { type FunctionComponent, useLayoutEffect, useRef } from 'react';

import { AppHeader } from '@/components/AppHeader';
import { routeTree } from '@/routeTree.gen';

const router = createRouter({ routeTree });

export const App: FunctionComponent = () => {
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const contentOffsetRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (bannerRef.current && contentOffsetRef.current) {
            contentOffsetRef.current.style.marginTop = `${bannerRef.current.clientHeight}px`;
        }
    }, []);

    return (
        <div className="flex flex-1 flex-col">
            <div className="fixed inset-x-0 z-50" ref={bannerRef}>
                <div className="w-full py-2 bg-primary">
                    <p className="text-white text-center font-bold">Ceasefire now! 🕊️</p>
                </div>
                <div className="mt-2">
                    <AppHeader />
                </div>
            </div>
            <div className="flex flex-col flex-1 pt-2" ref={contentOffsetRef}>
                <div className="flex-1">
                    <AnimatePresence>
                        <RouterProvider router={router} />
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

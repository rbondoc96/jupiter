import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {MenuMainPage, MenuMainPageSkeleton} from '@/pages/MenuMainPage';

export const Route = createFileRoute('/app/menu/')({
    component: () => (
        <Suspense fallback={<MenuMainPageSkeleton />}>
            <MenuMainPage />
        </Suspense>
    ),
});

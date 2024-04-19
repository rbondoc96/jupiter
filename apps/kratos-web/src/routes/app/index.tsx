import {createFileRoute} from '@tanstack/react-router';
import {Suspense} from 'react';

import {HubMainPage, HubMainPageSkeleton} from '@/pages/HubMainPage';

export const Route = createFileRoute('/app/')({
    component: () => (
        <Suspense fallback={<HubMainPageSkeleton />}>
            <HubMainPage />
        </Suspense>
    ),
});
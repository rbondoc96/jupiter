import type {RouteDefinition} from '@solidjs/router';

import HomePage from '@/pages/HomePage';

export default [
    {
        path: '/',
        component: HomePage,
    },
] satisfies RouteDefinition[];

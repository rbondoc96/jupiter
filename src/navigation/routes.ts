import {type RouteDefinition} from '@solidjs/router';
import {lazy} from 'solid-js';

export default [
    {
        path: '/',
        component: lazy(() => import('@/pages/HomePage')),
    },
] satisfies RouteDefinition[];

import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/app/exercises/muscle-groups/')({
    component: Outlet,
});

import {createFileRoute, redirect} from '@tanstack/react-router';
import {Suspense} from 'react';
import {enum as zEnum, object, optional, string} from 'zod';

import {userFetchQuery} from '@/core/queries';
import {LoginPage} from '@/pages/LoginPage';

export const Route = createFileRoute('/login')({
    // This sequence of `beforeLoad` and `loader` is needed.
    // This makes it so that the user gets redirected to the app
    // if they are already logged in.
    beforeLoad: async ({context}) => {
        const {queryClient} = context;

        try {
            await queryClient.ensureQueryData(userFetchQuery());
        } catch (error) {
            // Intentional no-op
        }
    },
    loader: ({context}) => {
        const {queryClient} = context;

        const user = queryClient.getQueryData(userFetchQuery().queryKey);

        if (user) {
            throw redirect({
                to: '/app',
            });
        }
    },
    validateSearch: object({
        redirect: optional(string()),
        view: optional(zEnum(['log_out', 'unauth'])),
    }),
    component: () => (
        <Suspense>
            <LoginPage />
        </Suspense>
    ),
});

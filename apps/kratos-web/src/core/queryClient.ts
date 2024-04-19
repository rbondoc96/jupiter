import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            retry: false,
        },
        queries: {
            // 1 hour
            gcTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            // 30 seconds
            staleTime: 30 * 1000,
        },
    },
});

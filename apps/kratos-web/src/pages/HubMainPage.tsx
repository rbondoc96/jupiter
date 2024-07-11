import { useSuspenseQuery } from '@tanstack/react-query';
import { type ReactNode } from 'react';

import { Skeleton } from '@jupiter/react-components';

import { AppHeader } from '@/components/AppHeader';
import { AppPageShell } from '@/components/AppPageShell';
import { userFetchQuery } from '@/core/queries';

export function HubMainPageSkeleton(): ReactNode {
    return (
        <div>
            <Skeleton className="h-4 w-[250px]" />
            <p>Loading...</p>
        </div>
    );
}

export function HubMainPage(): ReactNode {
    const { data: user } = useSuspenseQuery(userFetchQuery());

    return (
        <AppPageShell
            name="HubMainPage"
            _mobile={{
                header: <AppHeader title={`Welcome, ${user.name.first}`} />,
            }}
        >
            <main className="flex-1 flex flex-col px-4">
                <div className="flex-1 flex flex-col">
                    <div>
                        <h3 className="text-lg">Today&apos;s Activity</h3>
                    </div>
                </div>
            </main>
        </AppPageShell>
    );
}

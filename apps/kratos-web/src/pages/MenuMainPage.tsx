import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { type ReactNode, useCallback } from 'react';

import { Avatar, Button, Skeleton } from '@jupiter/react-components';

import userImage from '@/assets/images/user.png';
import { AppHeader, AppHeaderSkeleton } from '@/components/AppHeader';
import { AppPageShell } from '@/components/AppPageShell';
import { userLogOutMutation } from '@/core/mutations';
import { userFetchQuery } from '@/core/queries';
import { useRouter } from '@/hooks/useRouter';

export function MenuMainPageSkeleton(): ReactNode {
    return (
        <div className="flex-1 flex flex-col">
            <AppHeaderSkeleton
                classNames={{
                    title: 'h-4 w-1/2',
                }}
            />
            <Skeleton className="h-4 w-[250px]" />
        </div>
    );
}

export function MenuMainPage(): ReactNode {
    const queryClient = useQueryClient();
    const { data: user } = useSuspenseQuery(userFetchQuery());

    const { mutateAsync: logOutUser, isPending: isLoggingOut } = useMutation(userLogOutMutation(queryClient));

    const router = useRouter();

    const onLogOut = useCallback(async () => {
        await logOutUser();
        void router.push('/login', { view: 'log_out' });
    }, [logOutUser, router]);

    return (
        <AppPageShell
            name="MenuMainPage"
            helmet={{
                title: 'Menu',
            }}
            _mobile={{
                header: <AppHeader title="Menu" />,
            }}
        >
            <main className="flex-1 flex flex-col px-4">
                <div className="flex-1 flex flex-col gap-y-4">
                    <div>
                        <div className="bg-accent px-3 py-3 rounded-md">
                            <div className="flex items-center">
                                <div className="flex items-center gap-x-3">
                                    <Avatar alt="Avatar" fallback="Fallback" src={userImage} />
                                    <p>{user.name.full}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        isLoading={isLoggingOut}
                        classNames={{
                            root: 'self-stretch',
                        }}
                        onClick={onLogOut}
                    >
                        Log out
                    </Button>
                </div>
            </main>
        </AppPageShell>
    );
}

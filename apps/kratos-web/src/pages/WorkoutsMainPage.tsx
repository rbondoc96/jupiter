import {type ReactNode} from 'react';

import {AppHeader} from '@/components/AppHeader';
import {AppPageShell} from '@/components/AppPageShell';

export function WorkoutsMainPage(): ReactNode {
    return (
        <AppPageShell
            name="WorkoutsMainPage"
            _mobile={{
                header: <AppHeader title="Workouts" />,
            }}
        >
            <main className="flex-1 flex flex-col px-4">
                <div>
                    <div>
                        <h2>Workouts Main Page</h2>
                    </div>
                </div>
            </main>
        </AppPageShell>
    );
};

import {type ReactNode} from 'react';

import {AppHeader} from '@/components/AppHeader';
import {AppPageShell} from '@/components/AppPageShell';

export function GoalsMainPage(): ReactNode {
    return (
        <AppPageShell
            name="GoalsMainPage"
            _mobile={{
                header: <AppHeader title="Goals" />,
            }}
        >
            <main className="flex-1 flex flex-col px-4">
                <div>
                    <div>
                        <h2>Goals Main Page</h2>
                    </div>
                </div>
            </main>
        </AppPageShell>
    );
};

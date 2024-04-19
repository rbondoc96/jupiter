import {
    createContext,
    type FunctionComponent,
    type PropsWithChildren,
    type ReactNode,
    useContext,
    useState,
} from 'react';

import {AppTabBar} from '@/components/AppTabBar';
import {useIsMostLikelyMobile} from '@/stores/ui.store';

type AppContextValue = {
    setHeader: (header: ReactNode) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext(): AppContextValue {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }

    return context;
}

export const AppProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    // const currentPageRoute = useCurrentPageRoute();
    const isMostLikelyMobile = useIsMostLikelyMobile();

    const [Header, setHeader] = useState<ReactNode>();

    return (
        <AppContext.Provider
            value={{
                setHeader,
            }}
        >
            <div className={isMostLikelyMobile ? 'pb-14' : undefined}>
                {Header}

                {children}
            </div>

            {isMostLikelyMobile && <AppTabBar />}
        </AppContext.Provider>
    );
};

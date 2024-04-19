import {
    createContext,
    type PropsWithChildren,
    type ReactNode,
    useContext,
    useState,
} from 'react';

export type RootContextValue = {
    name: string;
    setName: (name: string) => void;
};

const RootContext = createContext<RootContextValue | null>(null);

export function useRootContext(): RootContextValue {
    const context = useContext(RootContext);

    if (!context) {
        throw new Error('RootContext must be used within a RootProvider');
    }

    return context;
}

export function RootProvider({
    children,
}: PropsWithChildren): ReactNode {
    const [name, setName] = useState<string>('RootProvider');

    return (
        <RootContext.Provider
            value={{
                name,
                setName,
            }}
        >
            {children}
        </RootContext.Provider>
    );
};

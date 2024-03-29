import {type FunctionComponent, useEffect} from 'react';
import {useAppTheme} from '@/hooks/stores/useLocalStore';
import {HomePage} from '@/pages/HomePage';
import {applyAppTheme} from '@/utilities/theme';

export const App: FunctionComponent = () => {
    const appTheme = useAppTheme();

    useEffect(
        () => {
            applyAppTheme(appTheme);
        },
        [appTheme],
    );

    return (
        <div className="app">
            <HomePage />            
        </div>
    );
};

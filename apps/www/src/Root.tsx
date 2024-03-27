import {MetaProvider} from '@solidjs/meta';
import {Router, useRoutes} from '@solidjs/router';
import type {Component} from 'solid-js';
import {Presence} from 'solid-motionone';

import routes from '@/navigation/routes';
import {initializeLocalStore} from '@/stores/local.store';

const Root: Component = () => {
    const Routes = useRoutes(routes);

    initializeLocalStore();

    return (
        <MetaProvider>
            <Router>
                <Presence exitBeforeEnter>
                    <Routes />
                </Presence>
            </Router>
        </MetaProvider>
    );
};

export default Root;

import {Presence} from '@motionone/solid';
import {MetaProvider} from '@solidjs/meta';
import {Router, useRoutes} from '@solidjs/router';
import {type Component, onMount} from 'solid-js';

import routes from '@/navigation/routes';
import {initializeLocalStore} from '@/stores/local.store';

const Root: Component = () => {
    const Routes = useRoutes(routes);

    onMount(() => {
        initializeLocalStore();
    });

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

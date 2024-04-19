import {type PropsWithChildren, type ReactNode} from 'react';
import {Helmet} from 'react-helmet-async';

import {composeClassName} from '@jupiter/ui-react/utilities';

import {Page, type PageProps} from '@/components/Page';
import {useIsMostLikelyMobile} from '@/stores/ui.store';

type AppPageShellProps = PageProps & {
    header?: ReactNode;
    helmet?: {
        title?: string;
    };
    _mobile?: {
        header?: ReactNode;
    };
};

export function AppPageShell({
    children,
    header,
    helmet,
    _mobile,
    ...props
}: PropsWithChildren<AppPageShellProps>): ReactNode {
    const isMostLikelyMobile = useIsMostLikelyMobile();

    return (
        <Page {...props}>
            {helmet && (
                <Helmet>
                    {helmet.title && <title>{helmet.title}</title>}
                </Helmet>
            )}

            <div className="flex-1 flex flex-col">
                {isMostLikelyMobile ? _mobile?.header : header}

                <aside className="relative">
                    <div
                        // Offset the banner from the header
                        className={composeClassName(
                            isMostLikelyMobile && 'h-14',
                        )}
                    />
                </aside>

                {children}
            </div>
        </Page>
    );
}

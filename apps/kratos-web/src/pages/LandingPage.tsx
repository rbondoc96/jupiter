import { Link } from '@tanstack/react-router';
import { type FunctionComponent } from 'react';

import { Button, Drawer, ResponsiveDialog } from '@jupiter/react-components';
import { composeClassName } from '@jupiter/web';

import { Logo } from '@/components/Logo';
import { Page } from '@/components/Page';

export const LandingPage: FunctionComponent = () => {
    return (
        <Page name="LandingPage">
            <header className={composeClassName('absolute z-10', 'w-full')}>
                <div className="flex justify-between items-center px-8 py-6">
                    <Logo showText tagLabel="dev" />
                    <div className="flex gap-12">
                        <nav className="flex items-center gap-8 md:gap-12">
                            <Link to="#">Features</Link>
                            <Link to="#">About</Link>
                            <Link to="#">FAQ</Link>
                            <Link to="#">Contact</Link>
                        </nav>

                        <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-8">
                <div className="relative flex justify-center items-center h-full">
                    <div className="max-w-[880px] flex flex-col justify-center items-center gap-8">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg text-center scroll-m-2 tracking-tight">
                                An exercise tracker made just for you.
                            </h3>

                            <h1 className="text-center font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-6xl scroll-m-20 tracking-tight">
                                Maximize your fitness journey.
                            </h1>
                        </div>

                        <Button asChild>
                            <Link to="/register">Get Started</Link>
                        </Button>

                        <h2 className="text-xl text-center scroll-m-20 tracking-tight">Free. Forever.</h2>

                        <Drawer>
                            <Drawer.Trigger>Open Drawer</Drawer.Trigger>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Title>Drawer Title</Drawer.Title>
                                    <Drawer.Description>Drawer Description</Drawer.Description>
                                </Drawer.Header>

                                <Drawer.Footer>
                                    <Drawer.Close>Close Me</Drawer.Close>
                                </Drawer.Footer>
                            </Drawer.Content>
                        </Drawer>

                        <ResponsiveDialog className="" />
                    </div>
                </div>
            </main>
        </Page>
    );
};

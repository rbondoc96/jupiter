import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import type {Component} from 'solid-js';
import {Motion} from 'solid-motionone';

import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';
import Button from '@/components/Button';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import Page from '@/components/Page';
import ThemeToggle from '@/components/ThemeToggle';

const HomePage: Component = () => {
    return (
        <Page
            anim-initial={{
                opacity: 0,
            }}
            anim-animate={{
                opacity: 1,
            }}
            anim-exit={{
                opacity: 0,
            }}
            anim-transition={{
                duration: 1,
            }}
        >
            <header class="w-full">
                <div class="absolute left-0 right-0 pt-8 z-50">
                    <div class="mx-auto max-w-7xl px-8 lg:px-10">
                        <div class="mx-auto max-w-2xl lg:max-w-none">
                            <div class="flex items-center justify-between">
                                <Motion.div
                                    /**
                                     * Don't use Motion.a because there is an issue
                                     * where the component will snap back to the initial animation
                                     * when it finishes the first time. So it will end up
                                     * playing the animation twice.
                                     */
                                    initial={{
                                        opacity: 0,
                                        y: '-100%',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: '0%',
                                    }}
                                    transition={{
                                        delay: 0.25,
                                        duration: 1,
                                    }}
                                >
                                    <Link unstyled aria-label="Home" class="block p-2" href="/">
                                        <Logo />
                                    </Link>
                                </Motion.div>

                                <Motion.div
                                    initial={{
                                        opacity: 0,
                                        y: '-100%',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: '0%',
                                    }}
                                    transition={{
                                        delay: 1,
                                        duration: 1,
                                    }}
                                >
                                    <ThemeToggle />
                                </Motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Motion.div
                class="h-screen w-full"
                initial={{
                    opacity: 0,
                    y: '-5%',
                }}
                animate={{
                    opacity: 1,
                    y: '0%',
                }}
                transition={{
                    delay: 1.5,
                    duration: 1,
                }}
            >
                <main class="h-screen p-4 flex flex-col items-center justify-center gap-y-4 md:gap-y-8">
                    <div class="flex flex-col items-center justify-center gap-y-3 md:gap-y-6">
                        <h1 class="text-5xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter">
                            Welcome!
                        </h1>
                        <h2 class="text-xl md:text-2xl 2xl:text-3xl text-center tracking-tighter">
                            I&apos;m in the middle of a&nbsp;
                            <Link href="https://www.solidjs.com/" target="_blank" rel="noreferrer">
                                solid
                            </Link>
                            &nbsp;makeover.
                        </h2>
                    </div>
                    <img
                        alt="Cat with a Laptop"
                        src={laptopWithCatSvg}
                        class="w-[150px] md:w-[250px] 2xl:w-[350px]"
                    />
                    <p class="text-sm md:text-base 2xl:text-lg text-center">
                        Check back again later! In the meantime, you can find me on:
                    </p>
                    <div class="flex flex-col gap-y-8">
                        <div class="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-8">
                            <Link
                                href="mailto:rbondoc96@gmail.com"
                                icon={faEnvelope}
                                rel="noreferrer"
                                target="_blank"
                            >
                                rbondoc96@gmail.com
                            </Link>
                            <Link
                                href="https://github.com/rbondoc96"
                                icon={faGithub}
                                rel="noreferrer"
                                size="2x"
                                target="_blank"
                            >
                                rbondoc96
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/rbondoc96/"
                                icon={faLinkedin}
                                rel="noreferrer"
                                size="2x"
                                target="_blank"
                            >
                                rbondoc96
                            </Link>
                        </div>
                        <Button
                            type="link"
                            href="https://drive.google.com/file/d/1zY5jY88vM6oEEuDUPbC6hFUGF-HILdYt/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                        >
                            My Resume
                        </Button>
                    </div>
                </main>
            </Motion.div>
        </Page>
    );
};

export default HomePage;

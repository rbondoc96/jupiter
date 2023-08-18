import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {Motion} from '@motionone/solid';
import {type Component} from 'solid-js';

import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';
import IconButton from '@/components/IconButton';
import Logo from '@/components/Logo';
import Page from '@/components/Page';
import ThemeToggle from '@/components/ThemeToggle';

const HomePage: Component = () => {
    return (
        <Page
            author="Rodrigo Bondoc"
            // eslint-disable-next-line max-len
            description="Rodrigo Bondoc is a software engineer who specializes in creating web and mobile apps."
            title="Rodrigo Bondoc"
            og-image="https://i.imgur.com/Z91PV7h.png"
            og-title="Rodrigo Bondoc"
            og-url="https://rbondoc.dev"
            twitter-creator="@rbondoc96"
            twitter-card="summary"
            twitter-image="https://i.imgur.com/Z91PV7h.png"
            twitter-image-alt="Rodrigo Bondoc's Website"
            twitter-site="@rbondoc96"
            
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
                                    <a
                                        aria-label="Home"
                                        class="block p-2"
                                        href="/"
                                    >
                                        <Logo />
                                    </a>
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
                <main
                    // eslint-disable-next-line max-len
                    class="h-screen p-4 flex flex-col items-center justify-center gap-y-4 md:gap-y-8"
                >
                    <div class="flex flex-col items-center justify-center gap-y-3 md:gap-y-6">
                        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                            Welcome!
                        </h1>
                        <h2 class="text-xl md:text-2xl lg:text-3xl text-center tracking-tighter">
                            I&apos;m in the middle of a&nbsp;
                            <a
                                // eslint-disable-next-line max-len
                                class="text-rose hover:text-cyan focus-visible:text-cyan font-medium"
                                href="https://www.solidjs.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <em>solid</em>
                            </a>
                            &nbsp;makeover.
                        </h2>
                    </div>
                    <img
                        alt="Cat with a Laptop"
                        src={laptopWithCatSvg}
                        class="w-[150px] md:w-[250px] lg:w-[350px]"
                    />
                    <p class="text-sm md:text-base lg:text-lg text-center">
                        Check back again later! In the meantime, you can find me on:
                    </p>
                    <div class="flex flex-col gap-y-8">
                        <div
                            // eslint-disable-next-line max-len
                            class="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-8"
                        >
                            <IconButton
                                // eslint-disable-next-line max-len
                                class="text-black dark:text-white hover:text-cyan focus-visible:text-cyan dark:hover:text-cyan dark:focus-visible:text-cyan text-xs md:text-sm flex items-center gap-x-3"
                                href="mailto:rbondoc96@gmail.com"
                                icon={faEnvelope}
                                label="rbondoc96@gmail.com"
                                rel="noopener noreferrer"
                                size="2x"
                                target="_blank"
                            />
                            <IconButton
                                // eslint-disable-next-line max-len
                                class="text-black dark:text-white hover:text-cyan focus-visible:text-cyan dark:hover:text-cyan dark:focus-visible:text-cyan text-xs md:text-sm flex items-center gap-x-3"
                                href="https://github.com/rbondoc96"
                                icon={faGithub}
                                label="rbondoc96"
                                rel="noopener noreferrer"
                                size="2x"
                                target="_blank"
                            />
                            <IconButton
                                // eslint-disable-next-line max-len
                                class="text-black dark:text-white hover:text-cyan focus-visible:text-cyan dark:hover:text-cyan dark:focus-visible:text-cyan text-xs md:text-sm flex items-center gap-x-3"
                                href="https://www.linkedin.com/in/rbondoc96/"
                                icon={faLinkedin}
                                label="rbondoc96"
                                rel="noopener noreferrer"
                                size="2x"
                                target="_blank"
                            />                            
                        </div>
                        <a
                            // eslint-disable-next-line max-len
                            class="self-center text-sm md:text-lg text-white px-5 py-3 rounded-lg bg-rose border-2 border-rose hover:text-rose hover:bg-transparent"
                            // eslint-disable-next-line max-len
                            href="https://drive.google.com/file/d/1zY5jY88vM6oEEuDUPbC6hFUGF-HILdYt/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            My Resume
                        </a>
                    </div>
                </main>
            </Motion.div>
        </Page>
    );
};

export default HomePage;

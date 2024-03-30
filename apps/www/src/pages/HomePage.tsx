import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import {type FunctionComponent} from 'react';

import {Link} from '@jupiter/ui-react';

import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';
import {Logo} from '@/components/Logo';
import {ResumeViewer} from '@/components/ResumeViewer';
import {ThemeToggle} from '@/components/ThemeToggle';

export const HomePage: FunctionComponent = () => {
    return (
        <motion.div
            className="flex flex-col"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 1,
            }}
        >
            <header className="w-full">
                <div className="fixed inset-x-0 z-50">
                    <div className="flex flex-col gap-y-2 items-stretch">
                        <div className="w-full py-2 bg-primary">
                            <p className="text-white text-center font-bold">
                                Ceasefire now! 🕊️
                            </p>
                        </div>
                        <div className="w-full mx-auto max-w-7xl px-10">
                            <div className="w-full lg:max-w-none">
                                <div className="flex items-center justify-between">
                                    <motion.div
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
                                        <Link
                                            href="/"
                                            className="block p-2"
                                            aria-label="Home"
                                        >
                                            <Logo />
                                        </Link>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: '-100%',
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: '0%',
                                        }}
                                        transition={{
                                            delay: 0.75,
                                            duration: 1,
                                        }}
                                    >
                                        <ThemeToggle />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <motion.div
                initial={{
                    opacity: 0,
                    y: '-5%',
                }}
                animate={{
                    opacity: 1,
                    y: '0%',
                }}
                transition={{
                    delay: 1.25,
                    duration: 1,
                }}
            >
                <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-y-4 md:gap-y-8">
                    <div className="flex flex-col items-center justify-center gap-y-3 md:gap-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
                            Welcome!
                        </h1>

                        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-center tracking-tighter">
                            I&apos;m in the middle of a website and repo rework.
                        </h2>
                    </div>

                    <img
                        alt="Cat with a Laptop"
                        src={laptopWithCatSvg}
                        className="w-[150px] md:w-[250px] 2xl:w-[350px]"
                    />

                    <p className="text-xs md:text-sm lg:text-base xl:text-lg text-center">
                        Check back again later! In the meantime, you can find me on:
                    </p>

                    <div className="flex flex-col items-center gap-y-8">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-8">
                            <Link
                                href="mailto:rbondoc96@gmail.com"
                                icon={faEnvelope}
                                className="font-normal"
                            >
                                rbondoc96@gmail.com
                            </Link>

                            <Link
                                href="https://github.com/rbondoc96"
                                target="_blank"
                                icon={faGithub}
                                className="font-normal"
                            >
                                rbondoc96
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/rbondoc96/"
                                target="_blank"
                                icon={faLinkedin}
                                className="font-normal"
                            >
                                rbondoc96
                            </Link>
                        </div>

                        <ResumeViewer />
                    </div>
                </main>
            </motion.div>
        </motion.div>
    );
};

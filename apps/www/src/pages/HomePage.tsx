import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {Link as RouterLink} from '@tanstack/react-router';
import {motion} from 'framer-motion';
import {type FunctionComponent} from 'react';
import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';
import {Button} from '@/components/Button';
import {Logo} from '@/components/Logo';
import {Link} from '@/components/Link';
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
                <div className="fixed inset-x-0 pt-8 z-50">
                    <div className="mx-auto max-w-7xl px-8 lg:px-10">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
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
                        <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter">
                            Welcome!
                        </h1>

                        <h2 className="text-xl md:text-2xl 2xl:text-3xl text-center tracking-tighter">
                            I&apos;m in the middle of a website and repo rework.
                        </h2>
                    </div>

                    <img
                        alt="Cat with a Laptop"
                        src={laptopWithCatSvg}
                        className="w-[150px] md:w-[250px] 2xl:w-[350px]"
                    />

                    <p className="text-sm md:text-base 2xl:text-lg text-center">
                        Check back again later! In the meantime, you can find me on:
                    </p>

                    <div className="flex flex-col items-center gap-y-8">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-8">
                            <Link
                                href="mailto:rbondoc96@gmail.com"
                                icon={faEnvelope}
                            >
                                rbondoc96@gmail.com
                            </Link>

                            <Link
                                href="https://github.com/rbondoc96"
                                target="_blank"
                                icon={faGithub}
                            >
                                rbondoc96
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/rbondoc96/"
                                target="_blank"
                                icon={faLinkedin}
                            >
                                rbondoc96
                            </Link>
                        </div>

                        <RouterLink to="/resume">
                            <Button>
                                My Resume
                            </Button>
                        </RouterLink>
                    </div>
                </main>
            </motion.div>
        </motion.div>
    );
};

import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {usePDF} from '@react-pdf/renderer';
import {motion} from 'framer-motion';
import {type FunctionComponent} from 'react';

import {Resume} from '@jupiter/react-resume';
import {Button, Link, Text} from '@jupiter/ui-react';

import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';
import {Logo} from '@/components/Logo';
import {ThemeToggle} from '@/components/ThemeToggle';

export const HomePage: FunctionComponent = () => {
    const [pdfInstance] = usePDF({document: <Resume />});

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
                        <Text as="h1">
                            Welcome!
                        </Text>

                        <Text as="h3" className="text-center">
                            I&apos;m in the middle of a website and repo rework.
                        </Text>
                    </div>

                    <img
                        alt="Cat with a Laptop"
                        src={laptopWithCatSvg}
                        className="w-[150px] md:w-[250px] 2xl:w-[350px]"
                    />

                    <Text as="p">
                        Check back again later! In the meantime, you can find me on:
                    </Text>

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

                        {pdfInstance.url && (
                            <Button asChild>
                                <a
                                    href={pdfInstance.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    My Resume
                                </a>
                            </Button>
                        )}
                    </div>
                </main>
            </motion.div>
        </motion.div>
    );
};

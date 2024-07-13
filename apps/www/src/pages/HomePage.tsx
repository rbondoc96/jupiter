import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { usePDF } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import { type FunctionComponent } from 'react';

import { Button, Link, Text } from '@jupiter/react-components';
import { Resume } from '@jupiter/react-resume';

import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';

export const HomePage: FunctionComponent = () => {
    const [pdfInstance] = usePDF({ document: <Resume /> });

    return (
        <div className="relative flex flex-col">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.9,
                    duration: 1,
                }}
            >
                <main className="flex flex-col items-center justify-center p-4 gap-y-4 md:gap-y-8">
                    <div className="flex flex-col items-center justify-center gap-y-3 md:gap-y-6">
                        <Text as="h1">Welcome!</Text>

                        <Text as="h3" className="text-center">
                            I&apos;m in the middle of a website and repo rework.
                        </Text>
                    </div>

                    <img
                        alt="Cat with a Laptop"
                        src={laptopWithCatSvg}
                        className="w-[150px] md:w-[250px] 2xl:w-[350px]"
                    />

                    <Text as="p" className="text-center">
                        Check back again later! In the meantime, you can find me on:
                    </Text>

                    <div className="flex flex-col items-center gap-y-8">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-y-4 md:gap-x-8">
                            <Link href="mailto:rbondoc96@gmail.com" icon={faEnvelope} className="font-normal">
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
                                <a href={pdfInstance.url} target="_blank" rel="noopener noreferrer">
                                    My Resume
                                </a>
                            </Button>
                        )}
                    </div>
                </main>
            </motion.div>
        </div>
    );
};

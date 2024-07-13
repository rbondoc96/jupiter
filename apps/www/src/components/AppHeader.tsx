import { Link } from '@jupiter/react-components';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';

export function AppHeader(): ReactNode {
    return (
        <header className="w-full">
            <div className="flex flex-col items-stretch">
                <div className="w-full mx-auto max-w-7xl px-10">
                    <div className="w-full lg:max-w-none">
                        <div className="flex items-center justify-between">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: 0.25,
                                    duration: 1,
                                }}
                            >
                                <Link href="/" className="block p-2" aria-label="Home">
                                    <Logo />
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
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
    );
}

import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {type FunctionComponent} from 'react';
import laptopWithCatSvg from '@/assets/images/laptop-with-cat.svg';
import {Button} from '@/components/Button';
import {Logo} from '@/components/Logo';
import {Link} from '@/components/Link';
import {ThemeToggle} from '@/components/ThemeToggle';

export const HomePage: FunctionComponent = () => {
    return (
        <div className="flex flex-col">
            <header className="w-full">
                <div className="fixed inset-x-0 pt-8 z-50">
                    <div className="mx-auto max-w-7xl px-8 lg:px-10">
                        <div className="mx-auto max-w-2xl lg:max-w-none">
                            <div className="flex items-center justify-between">
                                <Link
                                    href="/"
                                    className="block p-2"
                                    aria-label="Home"
                                >
                                    <Logo />
                                </Link>
                                
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-y-4 md:gap-y-8">
                <div className="flex flex-col items-center justify-center gap-y-3 md:gap-y-6">
                    <h1 className="text-5xl md:text-6xl 2xl:text-7xl font-bold tracking-tighter">
                        Welcome!
                    </h1>

                    <h2 className="text-xl md:text-2xl 2xl:text-3xl text-center tracking-tighter">
                        I&apos;m in the middle of a project rework.
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

                <div className="flex flex-col gap-y-8">
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

                    <Button>
                        My Resume
                    </Button>
                </div>
            </main>
        </div>
    );
};

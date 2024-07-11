import {animated, useTransition} from '@react-spring/web';
import {type FunctionComponent} from 'react';

import {composeClassName} from '@jupiter/web';

type LogoProps = {
    showText?: boolean;
    tagLabel?: 'dev' | 'rc';
    textColor?: 'dark' | 'light'
};

export const Logo: FunctionComponent<LogoProps> = ({
    showText = false,
    tagLabel,
    textColor = 'dark',
}) => {
    const tagLabelTransitions = useTransition(showText, {
        initial: {
            transition: 'transform',
            transitionDuration: '300ms',
            transitionTimingFunction: 'linear',
        },
        from: {
            opacity: 0,
            transform: showText ? 'translateX(-100%)' : 'translateY(-100%)',
        },
        enter: {
            opacity: 1,
            transform: showText ? 'translateX(0)' : 'translateY(0)',
        },
    });

    return (
        <div
            className={composeClassName(
                'relative inline-flex',
                showText && 'gap-x-2',
            )}
        >
            <svg
                id="logo"
                width={showText ? '108' : '38'}
                height="38"
                viewBox={`0 0 ${showText ? '108' : '38'} 38`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className={composeClassName({
                        'origin-left': true,
                        'scale-100 duration-200': showText,
                        'scale-0': !showText,
                        'fill-black': textColor === 'dark',
                        'fill-white': textColor === 'light',
                    })}
                    d="M48.72 26V12.28H55.5C56.4467 12.28 57.2333 12.46 57.86 12.82C58.4867 13.1667 58.9533 13.6533 59.26 14.28C59.58 14.9067 59.74 15.6333 59.74 16.46C59.74 17.3 59.5667 18.0467 59.22 18.7C58.8733 19.34 58.38 19.84 57.74 20.2C57.1133 20.56 56.36 20.74 55.48 20.74H50.62V26H48.72ZM50.62 19.1H55.36C56.1067 19.1 56.7 18.8667 57.14 18.4C57.5933 17.9333 57.82 17.2933 57.82 16.48C57.82 15.9333 57.7267 15.4733 57.54 15.1C57.3533 14.7267 57.08 14.44 56.72 14.24C56.36 14.0267 55.9067 13.92 55.36 13.92H50.62V19.1ZM60.8808 13.5V11.54H62.6408V13.5H60.8808ZM60.8808 26V15.48H62.6408V26H60.8808ZM63.473 26L67.253 20.62L63.653 15.48H65.773L68.333 19.24H68.433L70.993 15.48H72.993L69.393 20.56L73.193 26H71.093L68.333 21.94H68.233L65.473 26H63.473ZM74.0269 13.5V11.54H75.7869V13.5H74.0269ZM74.0269 26V15.48H75.7869V26H74.0269ZM81.9191 26.24C80.8791 26.24 79.9991 26.0467 79.2791 25.66C78.5724 25.26 78.0324 24.6533 77.6591 23.84C77.2991 23.0267 77.1191 21.9933 77.1191 20.74C77.1191 19.4733 77.2991 18.44 77.6591 17.64C78.0324 16.8267 78.5791 16.2267 79.2991 15.84C80.0191 15.44 80.9191 15.24 81.9991 15.24C82.9857 15.24 83.8124 15.4333 84.4791 15.82C85.1457 16.1933 85.6457 16.76 85.9791 17.52C86.3257 18.2667 86.4991 19.2067 86.4991 20.34V21.18H78.9391C78.9657 22.02 79.0857 22.7133 79.2991 23.26C79.5257 23.7933 79.8591 24.1867 80.2991 24.44C80.7391 24.68 81.2924 24.8 81.9591 24.8C82.4124 24.8 82.8057 24.7467 83.1391 24.64C83.4857 24.52 83.7724 24.3533 83.9991 24.14C84.2391 23.9267 84.4191 23.6733 84.5391 23.38C84.6591 23.0867 84.7257 22.7667 84.7391 22.42H86.4591C86.4457 22.98 86.3391 23.5 86.1391 23.98C85.9391 24.4467 85.6457 24.8467 85.2591 25.18C84.8724 25.5133 84.3991 25.7733 83.8391 25.96C83.2791 26.1467 82.6391 26.24 81.9191 26.24ZM78.9791 19.86H84.6791C84.6791 19.2733 84.6124 18.78 84.4791 18.38C84.3457 17.98 84.1524 17.6533 83.8991 17.4C83.6591 17.1467 83.3724 16.9667 83.0391 16.86C82.7191 16.74 82.3524 16.68 81.9391 16.68C81.3257 16.68 80.8057 16.7933 80.3791 17.02C79.9524 17.2467 79.6257 17.5933 79.3991 18.06C79.1724 18.5267 79.0324 19.1267 78.9791 19.86ZM88.2161 26V12.28H97.9361V13.92H90.1161V18.32H97.2361V19.94H90.1161V26H88.2161ZM99.3222 13.5V11.54H101.082V13.5H99.3222ZM99.3222 26V15.48H101.082V26H99.3222ZM105.474 26.24C104.928 26.24 104.501 26.14 104.194 25.94C103.888 25.7267 103.668 25.4533 103.534 25.12C103.401 24.7733 103.334 24.4067 103.334 24.02V16.96H101.974V15.48H103.374L103.694 12.54H105.094V15.48H107.074V16.96H105.094V23.76C105.094 24.0933 105.154 24.3467 105.274 24.52C105.394 24.68 105.621 24.76 105.954 24.76H107.074V25.92C106.941 25.9867 106.781 26.04 106.594 26.08C106.408 26.12 106.214 26.1533 106.014 26.18C105.828 26.22 105.648 26.24 105.474 26.24Z"
                />
                <g clipPath="url(#clip0_166_279)">
                    <g clipPath="url(#clip1_166_279)">
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M4.17004 25.0094L5.65305 24.4085"
                        />
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M8.34947 18.2806L5.38346 19.4825C4.99014 19.6418 4.65909 19.9086 4.46314 20.2241C4.2672 20.5396 4.2224 20.8779 4.3386 21.1647L6.96749 27.6523C7.08369 27.939 7.35138 28.1507 7.71167 28.2408C8.07195 28.3309 8.49532 28.292 8.88864 28.1326L11.8547 26.9307"
                        />
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M7.91123 17.1993L12.2927 28.012C12.4089 28.2987 12.6766 28.5104 13.0369 28.6005C13.3972 28.6906 13.8205 28.6517 14.2139 28.4923L15.6969 27.8914C16.0902 27.732 16.4212 27.4652 16.6172 27.1497C16.8131 26.8343 16.8579 26.4959 16.7417 26.2091L12.3602 15.3965C12.244 15.1097 11.9764 14.898 11.6161 14.8079C11.2558 14.7178 10.8324 14.7568 10.4391 14.9162L8.95609 15.5171C8.56277 15.6765 8.23173 15.9432 8.03578 16.2587C7.83983 16.5742 7.79503 16.9125 7.91123 17.1993Z"
                        />
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M14.551 20.8028L23.4491 17.1972"
                        />
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M26.1454 11.0693L29.1115 9.86743C29.5048 9.70805 29.9281 9.66912 30.2884 9.7592C30.6487 9.84928 30.9164 10.061 31.0326 10.3478L33.6615 16.8354C33.7777 17.1221 33.7329 17.4605 33.537 17.7759C33.341 18.0914 33.01 18.3582 32.6166 18.5176L29.6506 19.7194"
                        />
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M21.2583 11.7909L25.6398 22.6035C25.756 22.8903 26.0237 23.102 26.3839 23.1921C26.7442 23.2822 27.1676 23.2432 27.5609 23.0838L29.0439 22.4829C29.4372 22.3235 29.7683 22.0568 29.9642 21.7413C30.1602 21.4258 30.205 21.0875 30.0888 20.8007L25.7073 9.98803C25.5911 9.70126 25.3234 9.48955 24.9631 9.39947C24.6028 9.30939 24.1795 9.34833 23.7861 9.50771L22.3031 10.1086C21.9098 10.268 21.5788 10.5348 21.3828 10.8503C21.1869 11.1657 21.1421 11.5041 21.2583 11.7909Z"
                        />
                        <path
                            stroke="#4CF0C4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.3042"
                            d="M33.8301 12.9906L32.347 13.5915"
                        />
                    </g>
                </g>
                <defs>
                    <clipPath id="clip0_166_279">
                        <rect
                            width="36"
                            height="28"
                            fill="white"
                            transform="translate(1 5)"
                        />
                    </clipPath>
                    <clipPath id="clip1_166_279">
                        <rect
                            width="38.4033"
                            height="28"
                            fill="white"
                            transform="translate(-4.05383 13.2361) rotate(-22.0586)"
                        />
                    </clipPath>
                </defs>
            </svg>

            {tagLabel && tagLabelTransitions((style) => (
                <animated.div
                    className={composeClassName({
                        'flex items-center': showText,
                        'absolute inset-0': !showText,
                    })}
                    style={style}
                >
                    <div className={composeClassName({
                        'flex items-center': showText,
                        'flex justify-center items-end h-full': !showText,
                    })}>
                        <div className={composeClassName({
                            'inline-block': true,
                            'translate-y-3/4': !showText,
                        })}>
                            <span className="border border-primary rounded-md px-1 py-0.5 text-primary text-[8px] tracking-wide">
                                {tagLabel.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    );
};

import {type Component, mergeProps} from 'solid-js';

type LogoProps = {
    size?: 30 | 40 | 50;
};

const Logo: Component<LogoProps> = (props) => {
    const propsWithDefaults = mergeProps(
        {
            size: 40,
        },
        props,
    );

    return (
        <svg
            width={propsWithDefaults.size}
            height={propsWithDefaults.size}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Logo</title>
            <g clip-path="url(#clip0_501_773)">
                <path
                    d="M0.902832 0.901123V25.8558H5.237V5.26052H18.8582C21.8507 5.26052 23.6388 6.83982 23.6388 10.0664C23.6388 13.293 21.9883 15.0775 18.8582 15.0775H8.43547V18.922H17.7921L20.2086 21.5698H26.0553L22.7792 18.2703C26.0125 17.0346 27.9387 14.1171 27.9387 9.99803C27.9387 4.43731 24.5681 0.901123 18.8582 0.901123H0.902832Z"
                    fill="#CB274A"
                    stroke="#CB274A"
                    stroke-width="0.926042"
                />
                <path
                    d="M41.0483 49.0991C45.9326 49.0991 49.0971 46.1128 49.0971 41.5475C49.0971 38.6299 47.4461 36.639 45.1759 35.9182C47.0333 35.3346 48.65 33.7557 48.65 30.5977C48.65 26.3414 45.4167 24.1445 40.5324 24.1445H22.2334V49.0991H41.0483ZM40.8763 38.2523C43.3185 38.2523 44.66 39.4194 44.66 41.4789C44.66 43.916 42.3898 44.7741 39.2597 44.7741H26.6018V28.5039H38.8813C42.1146 28.5039 44.2128 28.9158 44.2128 31.5588C44.2128 33.7213 43.0433 34.5795 40.5668 34.5795H29.7663V38.2523H40.8763Z"
                    fill="#0CD9EA"
                    stroke="#0CD9EA"
                    stroke-width="0.926042"
                />
            </g>
            <defs>
                <clipPath id="clip0_501_773">
                    <rect width="50" height="50" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Logo;

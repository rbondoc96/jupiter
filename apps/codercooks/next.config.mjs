// @ts-check

import withMdx from '@next/mdx';

const generateConfig = withMdx({
    extension: /\.mdx?$/,
});

export default generateConfig({
    pageExtensions: ['mdx', 'ts', 'tsx'],
    reactStrictMode: true,
});

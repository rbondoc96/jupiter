// @ts-check

import { rimraf } from 'rimraf';

async function main() {
    // This script attempts to work around this issue:
    // https://github.com/npm/cli/issues/4828
    await rimraf('package-lock.json');
    await rimraf('node_modules');
}

main().catch(console.error);

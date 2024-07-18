// @ts-check

import { rimraf } from 'rimraf';

async function main() {
    await rimraf('package-lock.json');
    await rimraf('node_modules');
}

main().catch(console.error);

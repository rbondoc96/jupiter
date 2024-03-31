// @ts-check

import fs from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import pkg from '../package.json';

const resumeMetaDataFileName = 'resume-meta-data.json';
const cwd = resolve(fileURLToPath(import.meta.url), '..');
const filePath = join(resolve(cwd, '..', 'src', 'assets', resumeMetaDataFileName));

const resumeMetaData = {
    dateOfLastBuild: new Date().toISOString(),
    version: pkg.version,
};

async function main() {
    try {
        await fs.writeFile(filePath, JSON.stringify(resumeMetaData, null, 4) + '\n');
    } catch (error) {
        console.error('Error caught while trying to write resume meta data JSON file');
        console.error(error);
        throw error;
    }
}

void main();

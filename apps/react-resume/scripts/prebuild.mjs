// @ts-check

import fs from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const cwd = fileURLToPath(import.meta.url);
const resumeMetaDataFileName = 'resume-meta-data.json';

const resumeMetaData = {
    dateOfLastBuild: new Date().toISOString(),
};

async function main() {
    try {
        const filePath = join(resolve(cwd, '..', '..', 'src', 'assets', resumeMetaDataFileName));
        await fs.writeFile(filePath, JSON.stringify(resumeMetaData, null, 4) + '\n');
    } catch (error) {
        console.error('Error caught while trying to write resume meta data JSON file');
        console.error(error);
        throw error;
    }
}

void main();

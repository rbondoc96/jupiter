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
        await fs.writeFile(filePath, JSON.stringify(resumeMetaData, null, 4) + '\n', {
            // This flag opens the file for reading and writing and it also positions the stream at the beginning of the file.
            // File gets created if it doesn't exist.
            flag: 'w+',
        });
    } catch (error) {
        console.error('Error caught while trying to write resume meta data JSON file');
        console.error(error);
        throw error;
    }
}

void main();

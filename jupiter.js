// @ts-check

import {exec as execSync} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';

const exec = promisify(execSync);

/**
 * @param {string} networkName
 * @returns {Promise<boolean>}
 */
async function checkDockerNetworkExistence(networkName) {
    try {
        const {stdout} = await exec(`docker network ls --format "{{.Name}}" --filter name=${networkName}`);

        return stdout.trim() === networkName;
    } catch (error) {
        console.error('Error caught while checking for Docker network existence.');
        console.error(error);
        throw error;
    }
}

/**
 * @param {string} networkName
 */
async function createDockerNetwork(networkName) {
    try {
        await exec(`docker network create ${networkName}`);
        console.info(`Successfully added "${networkName}" as a Docker network.`);
    } catch (error) {
        console.error('Error caught while creating Docker network.');
        console.error(error);
        throw error;
    }
}

/**
 * @param {string} containerFolder
 */
async function buildAndStartDockerDaemon(containerFolder) {
    console.info(`Building and starting Docker daemon for ${containerFolder}...`);
    const dockerDirectory = resolve(fileURLToPath(import.meta.url), '..', 'docker', containerFolder);

    try {
        await exec(`docker compose up --build -d`, {
            cwd: dockerDirectory,
        });
    } catch (error) {
        console.error('Error caught while building and starting Docker daemon.');
        console.error(error);
        throw error;
    }
}

/**
 * @typedef {Object} JupiterConfig
 * @property {string} networkName
 */

/**
 * @param {JupiterConfig} config
 */
async function main({
    networkName,
}) {
    const doesNetworkExist = await checkDockerNetworkExistence(networkName);

    if (doesNetworkExist) {
        console.info(`${networkName} already exists as a Docker network.`);
    } else {
        console.info(`Adding ${networkName} as a Docker network...`);
        await createDockerNetwork(networkName);
    }

    await buildAndStartDockerDaemon('mailpit');
}

void main({
    networkName: 'jupiter',
});

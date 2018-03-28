'use strict';

const request = require('request');
const prequest = require('request-promise-native');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

exports.command = 'run';

exports.describe = 'run jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args['jail-config']);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

    try {

        if (!(await imageExists(jailConfig.name))) {

            await downloadFromRepo(jailConfig.name, args['repository-socket']);

        }

        await start(jailConfig.name);

    } catch (error) {

        console.log(error);

    } finally {

        logWebSocket.close();

    }


}

const imageExists = async (image) => {

    try {

        await prequest(`${globals.host}:${globals.port}/images/${image}`);
        return true;

    } catch (error) {

        if (error.statusCode === 404) return false;
        else throw error;

    }

}

const downloadFromRepo = async (image, repo = 'localhost:3000') => {

    await prequest({
        uri: `${globals.host}:${globals.port}/images/download-from-repo`,
        method: 'POST',
        json: true,
        body: {
            image: image,
            repository: repo
        }
    });

}

const start = async (image) => {

    await prequest({
        method: 'POST',
        uri: `${globals.host}:${globals.port}/jails/start`,
        headers: {
            'Content-type': 'application/json'
        },
        timeout: null,
        json: true,
        body: {
            name: image
        },
    });

}

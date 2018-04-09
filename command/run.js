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

    let jailConfig = new JailConfig(args);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig.name);

    let name = args['name'] !== undefined ? args['name'] : jailConfig.name;

    try {

        if (!(await imageExists(jailConfig, args))) {

            await downloadFromRepo(jailConfig, args);

        }

        await start(jailConfig, args);

    } catch (error) {

        console.log(error);

    } finally {

        logWebSocket.close();

    }


}

const imageExists = async (jailConfig, args) => {

    try {

        await prequest(`${args['server-protocol']}://${args['server-socket']}/images/${jailConfig.name}`);
        return true;

    } catch (error) {

        if (error.statusCode === 404) return false;
        else throw error;

    }

}

const downloadFromRepo = async (jailConfig, args) => {

    await prequest({
        uri: `${args['server-protocol']}://${args['server-socket']}/images/download-from-repo`,
        method: 'POST',
        json: true,
        body: {
            image: jailConfig.name,
            repository: args['repository-socket'],
        }
    });

}

const start = async (jailConfig, args) => {

    await prequest({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/jails/start`,
        headers: {
            'Content-type': 'application/json',
        },
        timeout: null,
        json: true,
        body: {
            name: jailConfig.name
        },
    });

}

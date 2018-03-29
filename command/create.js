'use strict';

const request = require('request');
const chalk = require('chalk');
const fs = require('fs');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const compress = require('../lib/compress.js');

exports.command = 'create';

exports.describe = 'create jail on server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

    let exclude = getIgnoreFiles();
    let archive = `/tmp/${jailConfig.name}-context.tar`;
    let cd = process.cwd();

    await compress('./', archive, {exclude, cd});
    let context = fs.createReadStream(archive);

    console.log(jailConfig);

    request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/images`,
        json: true,
        timeout: null,
        formData: {
            body: JSON.stringify(jailConfig),
            context: context,
        },
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        logWebSocket.close();

    });

}

const getIgnoreFiles = _ => {

    try {

        let data = fs.readFileSync(`${process.cwd()}/.jmakeignore`);
        return data.toString().trim().split("\n");

    } catch (error) {

        if (error.code !== 'ENOENT') throw error;

        return [];

    }

}

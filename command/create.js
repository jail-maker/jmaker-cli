'use strict';

const request = require('request');
const fs = require('fs');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const compress = require('../lib/compress.js');
const ignored = require('../lib/ignored-files.js');

exports.command = 'create';

exports.describe = 'import and build image on server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);

    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    let exclude = ignored.get();
    let archive = `/tmp/${jailConfig.name}-context.tar`;
    let cd = process.cwd();

    await compress('./', archive, {exclude, cd});
    let context = fs.createReadStream(archive);

    request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/image-builder`,
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
            logWebSocket.close();

        }


    });

}

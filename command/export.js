'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const fs = require('fs');
const path = require('path');

exports.command = 'export';

exports.describe = 'export image from server to repository';

exports.builder = yargs => {

    return yargs
        .option('name', {
            describe: 'name of image to export',
        })
        .option('file', {
            describe: 'name of output file',
            demandOption: true,
        })

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);

    let image = args['name'] !== undefined ? args['name'] : jailConfig.name;

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;

    let fromParams = {
        method: 'GET',
        uri: `${serverRoot}/images/${image}/exported`,
    };

    let output = path.resolve(args['file']);

    let stream = fs.createWriteStream(output);

    request(fromParams , (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

    }).pipe(stream);

}

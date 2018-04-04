'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const chalk = require('chalk');

exports.command = 'destroy';

exports.describe = 'destroy image';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);

    request({
        method: 'DELETE',
        uri: `${args['server-protocol']}://${args['server-socket']}/images/${jailConfig.name}`,
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

    });


}

'use strict';

const request = require('request');
const chalk = require('chalk');

const globals = require('../libs/globals');
const configData = require('../libs/config-data.js');
const wsClient = require('../libs/ws-client.js');

module.exports = _ => {

    request({
        method: 'DELETE',
        uri: `${globals.host}:${globals.port}/jails/${configData.name}/stop`,
    }, (error, response, body) => {

        let code = response.statusCode;

        if (response.statusCode !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        wsClient.close();

    });

}

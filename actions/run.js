'use strict';

const request = require('request');
const chalk = require('chalk');

const globals = require('../libs/globals');
const configData = require('../libs/config-data.js');
const wsClient = require('../libs/ws-client.js');

module.exports = _ => {

    request({
        method: 'POST',
        uri: `${globals.host}:${globals.port}/jails/run`,
        headers: {
            'Content-type': 'application/json'
        },
        timeout: null,
        body: JSON.stringify(configData),
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        wsClient.close();

    });

}

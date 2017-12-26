'use strict';

const request = require('request');
const chalk = require('chalk');

const globals = require('../libs/globals');
const configData = require('../libs/config-data.js');

module.exports = _ => {

    request({
        method: 'POST',
        uri: `${globals.host}:${globals.port}/jails`,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(configData),
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

    });

}

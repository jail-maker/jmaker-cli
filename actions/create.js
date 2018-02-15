'use strict';

const request = require('request');
const chalk = require('chalk');
const fs = require('fs');

const globals = require('../libs/globals');
const configData = require('../libs/config-data.js');
const wsClient = require('../libs/ws-client.js');
const compress = require('../libs/compress.js');

const getIgnoreFiles = _ => {

    try {

        let data = fs.readFileSync(`${globals.cwd}/.jmakeignore`);
        return data.toString().trim().split("\n");

    } catch (error) {

        if (error.code !== 'ENOENT') throw error;

        return [];

    }

}

module.exports = async _ => {

    let exclude = getIgnoreFiles();
    let archive = `/tmp/${configData.name}-context.tar`;
    await compress(globals.cwd, archive, exclude);
    let context = fs.createReadStream(archive);

    console.log(configData);

    request({
        method: 'POST',
        // uri: `${globals.host}:${globals.port}/jails/create`,
        uri: `${globals.host}:${globals.port}/images`,
        timeout: null,
        formData: {
            body: JSON.stringify(configData),
            context: context,
        },
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        wsClient.close();

    });

}

// module.exports = async _ => {

//     let archive = '/tmp/jmaker-context.tar';
//     await compress(globals.cwd, archive);
//     let context = fs.createReadStream(archive);

//     request({
//         method: 'POST',
//         uri: `${globals.host}:${globals.port}/jails/create`,
//         headers: {
//             'Content-type': 'application/json'
//         },
//         timeout: null,
//         body: JSON.stringify(configData),
//     }, (error, response, body) => {

//         let code = response.statusCode;

//         if (code !== 200) {

//             console.log(chalk.red(`${code} ${body}`));

//         }

//         wsClient.close();

//     });

// }

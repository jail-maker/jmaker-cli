'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const fs = require('fs');
const path = require('path');

module.exports = async args => {

    return new Promise((res, rej) => {

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

            if(error) rej(new Error(error));
            let code = response.statusCode;

            if(code != 200) {

                rej(new StatusCodeError({msg: response.body, code: code}));

            }

        }).pipe(stream);

        res();

    });

}

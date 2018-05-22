'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const fs = require('fs');
const path = require('path');
const HttpError = require('../error/http-error.js');
const verifyErrorCode = require('../lib/verify-error-code.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let image = args['name'] !== undefined ? args['name'] : jailConfig.name;

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;

    let fromParams = {
        method: 'GET',
        uri: `${serverRoot}/containers/list/${image}/exported`,
    };

    let output = path.resolve(args['file']);
    let stream = !output ? process.output : fs.createWriteStream(output);

    return new Promise((res, rej) => {

        request(fromParams , (error, response, body) => {

            if(error) rej(new Error(error));
            let code = response.statusCode;

            if(verifyErrorCode(code))
                rej(new HttpError({msg: body, code: code}));

        }).pipe(stream);

        stream.on('finish', () => {res();});

    });

}

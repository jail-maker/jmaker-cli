'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const fs = require('fs');
const path = require('path');
const DependencyResolver = require('../lib/dependency-resolver.js');
const HttpError = require('../error/http-error.js');
const verifyErrorCode = require('../lib/verify-error-code.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let inputFile = args['file'] !== undefined ? args['file'] : jailConfig.name + '.txz';

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;

    let toParams = {
        headers : {
            'content-type': 'application/x-xz',
        },
        method: 'POST',
        uri: `${serverRoot}/image-importer`,
    };

    let input = path.resolve(inputFile);
    let stream = fs.createReadStream(input);

    return new Promise((res, rej) => {

        stream.pipe(
            request(toParams, (error, response, body) => {

                let code = response.statusCode;

                if (verifyErrorCode(code))
                    rej(new HttpError({msg: body, code: code}));

                res();

            }));

    });

}

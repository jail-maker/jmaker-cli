'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const fs = require('fs');
const path = require('path');
const HttpError = require('../error/http-error.js');
const verifyErrorCode = require('../lib/verify-error-code.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);
    let inputFile = args.file;
    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;

    let toParams = {
        headers : {
            'content-type': 'application/x-tar',
        },
        method: 'POST',
        uri: `${serverRoot}/containers/importer`,
    };

    let input = path.resolve(inputFile);
    let stream = fs.createReadStream(input);

    await (new Promise((res, rej) => {

        stream.pipe(
            request(toParams, (error, response, body) => {

                if (error) throw new Error(error);

                let code = response.statusCode;

                if (verifyErrorCode(code))
                    rej(new HttpError({ msg: body, code: code }));

                res();

            })
        );

    }));

}

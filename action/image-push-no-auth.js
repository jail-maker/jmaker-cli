'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const HttpError = require('../error/http-error.js');
const verifyErrorCode = require('../lib/verify-error-code.js');

module.exports = async (config) => {

    let jailConfig = new JailConfig(config);
    let name = config['name'];

    let serverRoot = `${config['server-protocol']}://${config['server-socket']}`;
    let repositoryRoot = `${config['repository-protocol']}://${config['repository-socket']}`;

    let fromParams = {
        method: 'GET',
        uri: `${serverRoot}/images/${name}/exported`
    };

    let toParams = {
        headers: {
            'Content-Type' : 'application/x-xz',
        },
        method: 'POST',
        uri: `${repositoryRoot}/image-importer`,
    }

    return new Promise((resolve, reject) => {

        request(fromParams, (err, res, body) => {

            if(err) reject(new Error(body));
            let code = res.statusCode;
            if(verifyErrorCode(code))
                reject(new HttpError({msg: body, code: code}));

        }).pipe(request(toParams, (err, res, body) => {

            if(err) reject(new Error(body));
            let code = res.statusCode;
            if(verifyErrorCode(code))
                reject(new HttpError({msg: body, code: code}));

            resolve();

        }));

    });

}


'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const fs = require('fs');
const path = require('path');
const DependencyResolver = require('../lib/dependency-resolver.js');
const verifyErrorCode = require('../lib/verify-error-code.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let name = args['name'] !== undefined ? args['name'] : jailConfig.name;

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;
    let repositoryRoot = `${args['repository-protocol']}://${args['repository-socket']}`;

    // get all images required for installation by specified one
    let depRes = new DependencyResolver(serverRoot, repositoryRoot);
    let deps = await depRes.resolve(name);

    let stack = [ ...deps, name];

    let first = Promise.resolve();

    for(let image of stack) {

        await new Promise((resolve, reject) => {

            request.get(`${repositoryRoot}/images/${image}/data`, (err, res, body) => {

                if(err) reject(new Error(body));
                let code = res.statusCode;
                if(verifyErrorCode(code))
                    reject(new HttpError({msg: body, code: code}));

            }).pipe(

                request.post(`${serverRoot}/image-importer`, (err, res, body) => {

                    if(err) reject(new Error(body));
                    let code = res.statusCode;
                    if(verifyErrorCode(code))
                        reject(new HttpError({msg: body, code: code}));

                    resolve();

                })

            );

        });

    }

}

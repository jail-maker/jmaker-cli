'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const fs = require('fs');
const path = require('path');
const DependencyResolver = require('../lib/dependency-resolver.js');

exports.command = 'pull';

exports.describe = 'pull image from repository to server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);

    let name = jailConfig.name;

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;
    let repositoryRoot = `${args['repository-protocol']}://${args['repository-socket']}`;

    // get all images required for installation by specified one
    let depRes = new DependencyResolver(serverRoot, repositoryRoot);
    let deps = await depRes.resolve(name);

    let stack = [ ...deps, name];

    // pipe images from repository to server
    for(let image of stack) {

        let fromParams = {
            method: 'GET',
            uri: `${repositoryRoot}/images/${image}/data`
        };

        let toParams = {
            headers: {
                'Content-Type' : 'application/x-xz',
            },
            method: 'POST',
            uri: `${serverRoot}/image-importer`,
        }

        request(fromParams).pipe(request.post(toParams));

    }

}

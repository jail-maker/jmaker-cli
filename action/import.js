'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const fs = require('fs');
const path = require('path');
const DependencyResolver = require('../lib/dependency-resolver.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let inputFile = args['file'] !== undefined ? args['file'] : jailConfig.name + '.txz';

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;
    let repositoryRoot = `${args['repository-protocol']}://${args['repository-socket']}`;

    let toParams = {
        headers : {
            'content-type': 'application/x-xz',
        },
        method: 'POST',
        uri: `${serverRoot}/image-importer`,
    };

    let input = path.resolve(inputFile);
    let stream = fs.createReadStream(input);

    stream.pipe(
        request(toParams, (error, response, body) => {

            let code = response.statusCode;

            if (code !== 200) {

                console.log(chalk.red(`${code} ${body}`));

            }

        })
    );

}


'use strict';

// const request = require('request');
const request = require('request-promise-native');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const global = require('../lib/global.js');
const fs = require('fs');

exports.command = 'export';

exports.describe = 'export image from server to repository';

exports.builder = yargs => {

    return yargs
        .option('name', {
            alias: 'n',
            describe: 'name of image to export',
        });
        .options('output', {
            alias: 'a',
            describe: 'full path to output file',
            demandCommand: true,
        });

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);

    let name = jailConfig.name;

    let serverRoot = `${args['server-protocol']}://${args['server-socket']}`;

    let fromParams = {
        method: 'GET',
        uri: `${serverRoot}/images/${image}/exported`
    };

    let stream = fs.createFileStream(args['output']);
    request(fromParams).pipe(stream);

}

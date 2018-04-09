'use strict';

const imagePull = require('../action/image-pull.js');
const jailStart = require('../action/jail-start.js');

exports.command = 'run';

exports.describe = 'pull image and start jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    imagePull(args);
    jailStart(args);

}

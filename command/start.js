'use strict';

const jailStart = require('../action/jail-start.js');

exports.command = 'start';

exports.describe = 'start jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await jailStart(args);

}

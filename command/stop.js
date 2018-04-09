'use strict';

const jailStop = require('../action/jail-stop.js');

exports.command = 'stop';

exports.describe = 'stop jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await jailStop(args);

}

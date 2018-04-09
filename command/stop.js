'use strict';

const stopImage = require('../action/stop-jail.js');

exports.command = 'stop';

exports.describe = 'stop jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await stopJail(args);

}

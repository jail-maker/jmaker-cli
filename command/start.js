'use strict';

const startImage = require('../action/start-jail.js');

exports.command = 'start';

exports.describe = 'start jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await startJail(args);

}

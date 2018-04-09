'use strict';

const pullImage = require('../action/pull-image.js');

exports.command = 'pull';

exports.describe = 'pull image from repository to server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await pullImage(args);

}

'use strict';

const imagePull = require('../action/image-pull.js');

exports.command = 'pull';

exports.describe = 'pull image from repository to server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await imagePull(args);

}

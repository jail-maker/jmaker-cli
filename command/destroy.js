'use strict';


const imageDestroy = require('../action/image-destroy.js');

exports.command = 'destroy';

exports.describe = 'destroy image';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await imageDestroy(args);

}

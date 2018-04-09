'use strict';


const destroyImage = require('../action/destroy-image.js');

exports.command = 'destroy';

exports.describe = 'destroy image';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await destroyImage(args);

}

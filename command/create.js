'use strict';

const createImage = require('../action/create-image.js');

exports.command = 'create';

exports.describe = 'import and build image on server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await createImage(args);

}

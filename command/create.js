'use strict';

const imageCreate = require('../action/image-create.js');

exports.command = 'create';

exports.describe = 'import and build image on server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    await imageCreate(args);

}

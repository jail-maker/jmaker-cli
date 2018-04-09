'use strict';

const imageImport = require('../action/image-import.js');

exports.command = 'import';

exports.describe = 'import image from repository to server';

exports.builder = yargs => {

    return yargs
        .option('file', {
            describe: 'name of image file to import',
        });

}

exports.handler = async args => {

    await imageImport(args);

}

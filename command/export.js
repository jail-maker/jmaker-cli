'use strict';

const imageExport = require('../action/image-export.js');

exports.command = 'export';

exports.describe = 'export image from server to repository';

exports.builder = yargs => {

    return yargs
        .option('name', {
            describe: 'name of image to export',
        })
        .option('file', {
            describe: 'name of output file',
            demandOption: true,
        })

}

exports.handler = async args => {

    await imageExport(args);

}

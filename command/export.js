'use strict';

const imageExport = require('../action/image-export.js');

exports.command = 'export [--name name|id] <file>';

exports.describe = 'export image to file';

exports.builder = yargs => {

    return yargs
        .positional('file', {
            describe: 'name of output file',
        })
        .option('n', {
            alias: 'name',
            type: 'string',
            describe: 'name or id of image to export',
        });

}

exports.handler = async args => {

    try {

        await imageExport(args);

    } catch(e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

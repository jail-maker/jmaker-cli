'use strict';

const imageExport = require('../action/image-export.js');

exports.command = 'export [--name [name|id]] [--output [file]]';

exports.describe = 'export container.';

exports.builder = yargs => {

    return yargs
        .option('o', {
            alias: 'output',
            type: 'string',
            describe: 'path to file for saving, or - for output to stdout.',
        })
        .option('n', {
            alias: 'name',
            type: 'string',
            describe: 'name or id of container.',
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

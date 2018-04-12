'use strict';

const imageExport = require('../action/image-export.js');

exports.command = 'export <file>';

exports.describe = 'export image to file';

exports.builder = yargs => {

    return yargs
        .positional('file', {
            describe: 'name of output file',
        })
        .option('name', {
            describe: 'name of image to export',
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

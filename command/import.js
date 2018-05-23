'use strict';

const imageImport = require('../action/image-import.js');

exports.command = 'import <file>';

exports.describe = 'import image from repository';

exports.builder = yargs => {

    return yargs
        .positional('file', {
            type: 'string',
            describe: 'path to file or "-" for read from stdin',
        });

}

exports.handler = async args => {

    try {

        await imageImport(args);

    } catch(e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

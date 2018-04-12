'use strict';

const imageImport = require('../action/image-import.js');

exports.command = 'import <file>';

exports.describe = 'import image from repository to server';

exports.builder = yargs => {

    return yargs
        .positional('file', {
            describe: 'name of image file',
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

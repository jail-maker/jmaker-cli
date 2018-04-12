'use strict';


const imageDestroy = require('../action/image-destroy.js');

exports.command = 'destroy';

exports.describe = 'destroy image';

exports.builder = yargs => {

    return yargs
        .option('name', {
            describe: 'name of image',
        });

}

exports.handler = async args => {

    try {

        await imageDestroy(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

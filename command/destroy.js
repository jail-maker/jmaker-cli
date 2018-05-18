'use strict';


const imageDestroy = require('../action/image-destroy.js');

exports.command = 'destroy [-n|--name (name|id)]';

exports.describe = 'destroy conatiner';

exports.builder = yargs => {

    return yargs
        .option('n', {
            alias: 'name',
            type: 'string',
            describe: 'name or id of the conatiner.',
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

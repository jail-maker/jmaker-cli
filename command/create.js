'use strict';

const imageCreate = require('../action/image-create.js');

exports.command = 'create [--set-name name]';

exports.describe = 'import and build image';

exports.builder = yargs => {

    return yargs
        .option('set-name', {
            describe: 'set name for container after create',
            type: 'string',
        });

}

exports.handler = async args => {

    try {

        await imageCreate(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

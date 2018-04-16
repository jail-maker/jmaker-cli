'use strict';

const attachStream = require('../action/attach-stream.js');

exports.command = 'attach [name]';

exports.describe = 'attach input stream to current terminal';

exports.builder = yargs => {

    return yargs
        .positional('name', {
            describe: 'name of container',
        })
        .option('detach-keys', {
            default: 'ctrl+c',
            describe: 'sequence of keys to detach',
        });

}

exports.handler = async args => {

    try {

        await attachStream(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

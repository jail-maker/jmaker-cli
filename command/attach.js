'use strict';

const attachStream = require('../action/attach-input.js');

exports.command = 'attach [name]';

exports.describe = 'attach i/o streams to current terminal';

exports.builder = yargs => {

    return yargs
        .positional('name', {
            describe: 'name of container',
        })
        .option('i', {
            describe: 'input stream',
        })
        .option('o', {
            describe: 'output stream',
        });

}

exports.handler = async args => {

    try {

        if(args['i']) 
            await attachInput(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

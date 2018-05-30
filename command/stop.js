'use strict';

const jailStop = require('../action/jail-stop.js');
const hostRemove = require('../action/host-remove.js');

exports.command = 'stop [-n|--name name]';

exports.describe = 'stop container';

exports.builder = yargs => {

    yargs
        .option('n', {
            alias: 'name',
            type: 'string',
            describe: 'name or id of container.'
        })

    return yargs;

};

exports.handler = async args => {

    try {

        await jailStop(args);
        // await hostRemove(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

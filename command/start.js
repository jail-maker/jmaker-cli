'use strict';

const jailStart = require('../action/jail-start.js');
const hostAdd = require('../action/host-add.js');

exports.command = 'start [-n|--name name] [-o|--options ...]';

exports.describe = 'start container';

exports.builder = yargs => {

    yargs
        .option('r', {
            alias: 'rules',
            type: 'array',
            default: [],
            describe: 'runtime rules for container.'
        })
        .option('n', {
            alias: 'name',
            type: 'string',
            describe: 'name or id of container.'
        })

    return yargs;

};

exports.handler = async args => {

    try {

        new Promise((resolve, reject) => {
            setTimeout(async _ => {
                await hostAdd(args);
                resolve();
            }, 10000);
        });

        await jailStart(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

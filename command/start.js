'use strict';

const jailStart = require('../action/jail-start.js');
const hostAdd = require('../action/host-add.js');

exports.command = 'start';

exports.describe = 'start jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    try {

        await jailStart(args);
        await hostAdd(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

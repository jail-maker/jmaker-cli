'use strict';

const jailStop = require('../action/jail-stop.js');
const removeHost = require('../action/host-remove.js');

exports.command = 'stop';

exports.describe = 'stop jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

    try {

        await removeHost(args);
        await jailStop(args);

    } catch (e) {

        if(e.name == 'HttpError') {

            console.log(`${e.code}, ${e.message}`);

        } else throw e;

    }

}

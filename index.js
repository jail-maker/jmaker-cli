#!/usr/bin/env node

'use strict';

const Daemonize = require('daemonize');
const globals = require(__dirname + '/libs/globals.js');
const configData = require(__dirname + '/libs/config-data.js');
const wsClient = require(__dirname + '/libs/ws-client.js');

const create = require(__dirname + '/actions/create.js');
const start = require(__dirname + '/actions/start.js');
const run = require(__dirname + '/actions/run.js');
const stop = require(__dirname + '/actions/stop.js');

let settings = {
    pid: `${process.env.HOME}/.jmaker-cli.pid`,
};

let daemonize = new Daemonize(settings);

if (process.argv.indexOf('--daemonize') !== -1) daemonize.start();
else if (process.argv.indexOf('-d') !== -1) daemonize.start();

async function sendCommand(command) {

    switch (command) {

        case 'create':
            await create();
            break;

        case 'start':
            start();
            break;

        case 'run':
            run();
            break;

        case 'stop':
            stop();
            break;

        case 'restart':
            break;

        default:
            break;

    }

}

wsClient.on('open', async _ => {

    console.log('connected');

    wsClient.send(JSON.stringify({
        action: 'connect',
        channel:  configData.name,
        data: '',
    }));

    await sendCommand(globals.command);

});

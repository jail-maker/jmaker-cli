#!/usr/bin/env node

'use strict';

const globals = require(__dirname + '/libs/globals.js');
const configData = require(__dirname + '/libs/config-data.js');
const wsClient = require(__dirname + '/libs/ws-client.js');

const create = require(__dirname + '/actions/create.js');
const start = require(__dirname + '/actions/start.js');
const run = require(__dirname + '/actions/run.js');
const stop = require(__dirname + '/actions/stop.js');

function sendCommand(command) {

    switch (command) {

        case 'create':
            create();
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

wsClient.on('open', _ => {

    console.log('connected');
    wsClient.send(configData.name);
    sendCommand(globals.command);

});

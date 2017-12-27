#!/usr/bin/env node

'use strict';

const globals = require(__dirname + '/libs/globals.js');
const configData = require(__dirname + '/libs/config-data.js');
const wsClient = require(__dirname + '/libs/ws-client.js');

const start = require(__dirname + '/actions/start.js');
const stop = require(__dirname + '/actions/stop.js');

function sendCommand(command) {

    switch (command) {

        case 'start':
            start();
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

#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const url = require('url');
const yaml = require('js-yaml');
const minimist = require('minimist');
const request = require('request');
const chalk = require('chalk');
const WebSocket = require('ws');
const log = console.log;

const globals = require(__dirname + '/libs/globals.js');
const configData = require(__dirname + '/libs/config-data.js');

const start = require(__dirname + '/actions/start.js');
const stop = require(__dirname + '/actions/stop.js');

function logHandler(data) {

    let {
        level,
        text
    } = JSON.parse(data);

    switch (level) {

        case 3:
            text = chalk.green(text);
            break;

        case 2:
            text = chalk.yellow(text);
            break;

        case 1:
            text = chalk.red(text);
            break;

    }

    let stream = process.stdout;
    stream.write(text);

}

function sendCommand(command) {

    switch (command) {

        case 'start':

            start();

            break;

        case 'stop':

            request({
                method: 'DELETE',
                uri: `${globals.host}:${globals.port}/jails/${configData.name}`,
            }, (error, response, body) => {

                let code = response.statusCode;

                if (response.statusCode !== 200) {

                    console.log(chalk.red(code + ' ' + body));

                }

            });

            break;

        case 'refresh':
            break;

        default:
            break;

    }

}

let addr = url.parse(globals.host);
const ws = new WebSocket(`ws://${addr.host}:3347/`);

ws.on('open', _ => {

    console.log('connected');
    ws.send(configData.name);
    sendCommand(globals.command);

});

ws.on('message', logHandler);
ws.on('close', _ => console.log('disconnected'));


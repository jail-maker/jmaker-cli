'use strict';

const url = require('url');
const chalk = require('chalk');
const WebSocket = require('ws');

const globals = require('./globals');

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

let addr = url.parse(globals.host);
const ws = new WebSocket(`ws://${addr.host}:3347/`);

ws.on('message', logHandler);
ws.on('close', _ => console.log('disconnected'));

module.exports = ws;

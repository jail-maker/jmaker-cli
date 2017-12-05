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

const ARGV = minimist(process.argv.slice(2));
const CWD = process.cwd();

let {

    port = 3346,
    host = 'http://127.0.0.1',
    config = 'jmakefile.yml',
    env = undefined

} = ARGV;

if (!env) env = process.env['JMAKER_ENV'];

let configFile = config;
let command = ARGV._[0];

var configData = {};

try {

    let buffer = fs.readFileSync(__dirname + '/defaults.yml', 'utf8');
    let defaults = yaml.safeLoad(buffer);

    buffer = fs.readFileSync(`${CWD}/${configFile}`, 'utf8');
    configData = yaml.safeLoad(buffer);

    configData = Object.assign(defaults, configData);

} catch (e) {

    console.log(e);
    process.exit();

}

let envData = configData.env;
delete(configData.env);

Object.assign(configData, envData[env]);

let mounts = configData.mounts.map(points => {

    return [path.resolve(points[0]), points[1]];

});

configData.mounts = mounts;

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

    console.log(text);

}

function sendCommand() {
    switch (command) {

        case 'start':

            request({
                method: 'POST',
                uri: `${host}:${port}/jails`,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(configData),
            }, (error, response, body) => {

                // console.log(error);

            });

            break;

        case 'stop':

            request({
                method: 'DELETE',
                uri: `${host}:${port}/jails/${configData.name}`,
            }, (error, response, body) => {

                // console.log(error);

            });

            break;

        case 'refresh':
            break;

        default:
            break;

    }

}

let addr = url.parse(host);
const ws = new WebSocket(`ws://${addr.host}:8080/`);

ws.on('open', _ => {

    console.log('connected');
    ws.send(configData.name);
    sendCommand(command);

});

ws.on('message', logHandler);
ws.on('close', _ => console.log('disconnected'));


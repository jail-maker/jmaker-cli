#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const minimist = require('minimist');
const request = require('request');
const chalk = require('chalk');
const log = console.log;

const ARGV = minimist(process.argv.slice(2));
const CWD = process.cwd();

console.dir(ARGV);

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
    defaults = yaml.safeLoad(buffer);

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
console.log(configData);

let mounts = configData.mounts.map(points => {

    return [path.resolve(points[0]), points[1]];

});

configData.mounts = mounts;

switch (command) {

    case 'start':

        request(`${host}:${port}/jails/${configData.name}/log-stream`)
            .pipe(process.stdout);

        request({
            method: 'POST',
            uri: `${host}:${port}/jails`,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(configData),
        }, (error, response, body) => {

            console.log(error);

        });

        break;

    case 'stop':

        request(`${host}:${port}/jails/${configData.name}/log-stream`)
            .pipe(process.stdout);

        request({
            method: 'DELETE',
            uri: `${host}:${port}/jails/${configData.name}`,
        }, (error, response, body) => {

            console.log(error);

        });

        break;

    case 'refresh':
        break;

    default:
        break;

}


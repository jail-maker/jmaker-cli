#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const minimist = require('minimist');
const request = require('request');

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

    let buffer = fs.readFileSync(`${CWD}/${configFile}`, 'utf8');
    configData = yaml.safeLoad(buffer);

} catch (e) {

    console.log(e);
    process.exit();

}

let envData = configData.env;
delete(configData.env);

Object.assign(configData, envData[env]);
console.log(configData);

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

            console.log(error, response, body);

        });
        break;

    case 'stop':
        break;

    case 'refresh':
        break;

    default:
        break;

}


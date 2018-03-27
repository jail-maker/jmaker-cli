#!/usr/bin/env node
'use strict';

const yargs = require('yargs');
const fs = require('fs');
const yaml = require('js-yaml');
const Daemonize = require('daemonize');

let args = yargs
    .commandDir('command')
    .option('config', {
        default: 'config.yml',
    })
    .option('daemonize', {
        alias: 'd',
        type: 'boolean',
    })
    .env('JMAKER')
    .demandCommand(0,1)
    .recommendCommands()
    .wrap(null)
    .config('config', function(configFile) {

        let content = fs.readFileSync(configFile, 'utf-8');
        let obj = yaml.safeLoad(content);

        return obj;

    })
    .version(`0.0.3`)   
    .parse();

if(args['daemonize']) {

    let settings = {
        pid: `${process.env.HOME}/.jmaker-cli.pid`,
    };

    let daemonize = new Daemonize(settings);

    daemonize.start();

}

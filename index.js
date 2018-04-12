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
    .option('profile', {
        default: undefined,
    })
    .env('JMAKER')
    .demandCommand(0,1)
    .strict(true)
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

/*

tar -a -cf ../freebsd-11.1_1.txz .
jmaker-cli import freebsd-11.1
jmaker-cli push freebsd-11.1
jmaker-cli create
jmaker-cli start
jmaker-cli stop
jmaker-cli export freebsd-11.1 /home/md/freebsd-11.1.txz
jmaker-cli destroy

*/

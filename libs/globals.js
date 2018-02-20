'use strict';

const minimist = require('minimist');
const ARGV = minimist(process.argv.slice(2));

class Globals {

    constructor() {

        let {

            port = 3346,
            host = 'http://127.0.0.1',
            config = 'jmakefile.yml',
            repository = 'localhost:3000',
            profile = undefined,

        } = ARGV;

        let command = ARGV._[0];

        if (!profile) profile = process.env['JMAKER_PROFILE'];

        this.port = port;
        this.host = host;
        this.configFile = config;
        this.profile = profile;
        this.command = command;
        this.repository = repository;
        this.cwd = process.cwd();

    }

}

module.exports = new Globals();

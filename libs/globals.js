'use strict';

const minimist = require('minimist');
const ARGV = minimist(process.argv.slice(2));
const os = require('os');
const {ensureDirSync} = require('fs-extra');
const path = require('path');

class Globals {

    constructor() {

        let {

            port = 3346,
            host = 'http://127.0.0.1',
            config = 'jmakefile.yml',
            repository = 'localhost:3000',
            profile = undefined,
            context = process.cwd(),
            authServer = 'localhost:3001', 

        } = ARGV;

        let command = ARGV._[0];

        if (!profile) profile = process.env['JMAKER_PROFILE'];

        this.port = port;
        this.host = host;
        this.configFile = config;
        this.profile = profile;
        this.command = command;
        this.repository = repository;
        this.context = context;
        this.cwd = process.cwd();
        this.authServer = authServer;

        let homeDir  = os.homedir();
        let dir = path.resolve(homeDir, '.cache', 'jmaker-cli');
        ensureDirSync(dir);

        let file = path.resolve(dir, 'token.json');

        this.tokenFile = file;

    }

}

module.exports = new Globals();

'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const minimist = require('minimist');

const globals = require('./globals');

const ARGV = minimist(process.argv.slice(2));

class ConfigData {

    constructor() {

        try {

            let buffer = fs.readFileSync(__dirname + '/../defaults.yml', 'utf8');
            let defaults = yaml.safeLoad(buffer);
            Object.assign(this, defaults);

        } catch (error) {

            console.log(error);
            process.exit();

        }

        try {

            let buffer = fs.readFileSync(`${globals.cwd}/${globals.configFile}`, 'utf8');
            let data = yaml.safeLoad(buffer);
            Object.assign(this, data);

        } catch (error) {

            console.log(`File ${globals.configFile} not found.`)

        }

        Object.assign(this, this.profile[globals.profile]);
        delete(this.profile);

        for (let key in this) {

            if (ARGV[key])
                this[key] = ARGV[key];

        };

        this.mounts = this.mounts.map(points => {

            return [path.resolve(points[0]), points[1]];

        });

        this.copy = this.copy.map(points => {

            return [path.resolve(points[0]), points[1]];

        });

    }

}

module.exports = new ConfigData;

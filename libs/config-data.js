'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const globals = require('./globals');

class ConfigData {

    constructor() {

        try {

            let buffer = fs.readFileSync(__dirname + '/../defaults.yml', 'utf8');
            let defaults = yaml.safeLoad(buffer);

            buffer = fs.readFileSync(`${globals.cwd}/${globals.configFile}`, 'utf8');
            let data = yaml.safeLoad(buffer);
            Object.assign(this, defaults, data);

        } catch (error) {

            console.log(error);
            process.exit();

        }

        Object.assign(this, this.profile[globals.profile]);
        delete(this.profile);

        this.mounts = this.mounts.map(points => {

            return [path.resolve(points[0]), points[1]];

        });

    }

}

module.exports = new ConfigData;

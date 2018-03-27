'use strict';

// const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const chalk = require('chalk');

class JailConfig {

    constructor(configFile) {

        let pathDefault = path.resolve(__dirname, '../jmakefile-default.yml');
        let content = fs.readFileSync(pathDefault, 'utf-8');
        let obj = yaml.safeLoad(content);
        Object.assign(this, obj);

        try {

            content = fs.readFileSync(path.resolve(configFile), 'utf-8');
            obj = yaml.safeLoad(content);
            Object.assign(this, obj);

        } catch (e) {

            if (e.code == 'ENOENT') {

                console.log(chalk.red('no jail-config file present'));

            } else {

                console.log(chalk.red('jail-config file parsing error occured'));

            }

        }

        this.mounts = this.mounts.map(points => {

            return [path.resolve(points[0]), points[1]];

        });

        this.copy = this.copy.map(points => {

            if (typeof(points) === 'string') 
                points = [points, points];

            return [path.resolve(points[0]), path.resolve(points[1])];

        });

    }

}

module.exports = JailConfig;

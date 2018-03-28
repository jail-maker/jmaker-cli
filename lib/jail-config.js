'use strict';

// const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const chalk = require('chalk');

class JailConfig {

    constructor(args) {

        let configFile = args['jail-config'];

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

        if(args['profile'] !== undefined) {

            Object.assign(this, this.profile[args['profile']]);
            delete(this.profile);

        }

        for(let key in this) {

            if(args[key])
                this[key] = args[key];

        }

    }

}

module.exports = JailConfig;

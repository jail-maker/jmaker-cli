'use strict';

const fs = require('fs');

class IgnoredFiles {

    constructor() {

        this._ingoredFiles = [];

        try {

            let data = fs.readFileSync(`${process.cwd()}/.jmakeignore`);
            this.ignoreFilies = data.toString().trim().split("\n");

        } catch (error) {

            if (error.code !== 'ENOENT') throw error;

        }

    }

    get() {

        return this._ingoredFiles;

    }

}

module.exports = new IgnoredFiles();

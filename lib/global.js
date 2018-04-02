'use strict';

const path = require('path');

class Global {

    constructor() {

        this.imagesDir = 'images';
        this.dataDir = path.resolve(this.imagesDir, 'images');
        this.manifestDir = path.resolve(this.imagesDir, 'manifest');

    }

}

module.exports = new Global();

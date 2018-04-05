'use strict';

module.exports = class Exists extends Error {

    constructor(message) {

        super(message);
        this.name = 'Exists';

    }

}

'use strict';

module.exports = class JwtAuthRequired extends Error {

    constructor(message) {

        super(message);
        this.name = 'JwtAuthRequired';

    }

}

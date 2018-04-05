'use strict';

/**
 * Exception for 401 http error
 */

module.exports = class Unauthorized extends Error {

    constructor(message, type) {

        super(message);
        this.name = 'Unauthorized';
        this.type = type;

    }

}

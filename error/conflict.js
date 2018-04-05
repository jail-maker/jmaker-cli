'use strict';

/**
 * Exception for 409 http error
 */

module.exports = class Conflict extends Error {

    constructor(message) {

        super(message);
        this.name = 'Conflict';

    }

}

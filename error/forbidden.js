'use strict';

/**
 * Exception for 403 http error
 */

module.exports = class Forbidden extends Error {

    constructor(message) {

        super(message);
        this.name = 'Forbidden';

    }

}

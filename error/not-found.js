'use strict';
/**
 * Exception for 404 http error
 */

module.exports = class NotFound extends Error {

    constructor(message) {

        super(message);
        this.name = 'NotFound';

    }

}

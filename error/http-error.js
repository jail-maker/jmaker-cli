'use strict';

/**
 * Exception for http status codes
 */

module.exports = class HttpError extends Error {

    constructor({msg: message, code: code}) {

        super(message);
        this.name = 'HttpError';
        this.code = code;

    }

}

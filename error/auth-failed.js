'use strict';

module.exports = class AuthFailed extends Error {

    constructor(message) {

        super(message);
        this.name = 'AuthFailed';

    }

}

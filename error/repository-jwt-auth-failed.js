'use strict';

module.exports = class RepositoryJwtAuthFailed extends Error {

    constructor(message) {

        super(message);
        this.name = 'RepositoryJwtAuthFailed';

    }

}

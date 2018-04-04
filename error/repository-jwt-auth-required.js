'use strict';

module.exports = class RepositoryJwtAuthRequired extends Error {

    constructor(message) {

        super(message);
        this.name = 'RepositoryJwtAuthRequired';

    }

}

'use strict';

const request = require('request-promise-native');
const fetch = require('./bsd-fetch.js');

class Repository {

    constructor(protocol, socket, api = 'v1') {

        this._origin = `${protocol}://${socket}/api/${api}`;

    }

    async getMeta(image) {

        let meta = await request(`${this._origin}/images/${image}`);
        return JSON.parse(meta);

    }

    downloadImage(image, dst) { 

        return fetch(`${this._origin}/images/${image}/data`, dst);

    }

    async getParents(image) {

        let data = await request(`${this._origin}/images/${image}/parents`);
        return JSON.parse(data);

    }

    async hasImage(image) {

        try {

            await request(`${this._origin}/images/${image}`);
            return true;

        } catch (error) {

            return false;

        }

    }

}

module.exports = Repository;

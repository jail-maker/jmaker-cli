#!/usr/bin/env node

'use strict'

const request = require('request-promise-native');

const SERV_HOST = '127.0.0.1';
const SERV_PORT = '3346';
const SERV_API_VERSION = 'v1';
const SERV_OROGIN = `http://${SERV_HOST}:${SERV_PORT}`;

const REPO_HOST = '127.0.0.1';
const REPO_PORT = '3000';
const REPO_API_VERSION = 'v1';
const REPO_OROGIN = `http://${REPO_HOST}:${REPO_PORT}/api/${REPO_API_VERSION}`;

const IMAGE_NAME = 'first';

const imageExists = async href => {

    try {

        await request(href);
        return true;

    } catch (error) {

        if (error.statusCode === 404) return false;
        else throw error;

    }

}

(async _ => {

    request({
        uri: `${SERV_OROGIN}/images/download-from-repo`,
        method: 'POST',
        json: true,
        body: {
            image: 'second',
            repository: 'localhost:3000'
        }
    });

})();

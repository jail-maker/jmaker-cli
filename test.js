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

const IMAGE_NAME = 'jmaker-cli';

(async _ => {

    await request({
        uri: `${SERV_OROGIN}/images/download-from-repo`,
        method: 'POST',
        json: true,
        body: {
            image: IMAGE_NAME,
            repository: 'localhost:3000'
        }
    });

    // await request({
    //     uri: `${REPO_OROGIN}/images/second`,
    //     method: 'DELETE',
    // });

    // await request({
    //     uri: `${SERV_OROGIN}/images/push-to-repo`,
    //     method: 'POST',
    //     json: true,
    //     body: {
    //         image: IMAGE_NAME,
    //         repository: 'localhost:3000'
    //     }
    // });

})();

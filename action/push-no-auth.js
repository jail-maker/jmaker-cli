'use strict';
/**
 * throws 
 *      JwtAuthRequired
 *      NotFound
 *      Exists
 */

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const JwtAuthRequired = require('../error/jwt-auth-required.js');
const NotFound = require('../error/not-found.js');
const exists = require('../error/exists.js');

module.exports = async (config) => {

    let jailConfig = new JailConfig(config);
    let name = jailConfig.name;

    let serverRoot = `${config['server-protocol']}://${config['server-socket']}`;
    let repositoryRoot = `${config['repository-protocol']}://${config['repository-socket']}`;

    let fromParams = {
        method: 'GET',
        uri: `${serverRoot}/images/${name}/exported`
    };

    let toParams = {
        headers: {
            'Content-Type' : 'application/x-xz',
        },
        method: 'POST',
        uri: `${repositoryRoot}/image-importer`,
    }

    request(fromParams, handlerFrom).pipe(request(toParams), handlerTo);

}

let handlerFrom = (error, response, body) => {

    if(response.statusCode == 404) {

        throw new NotFound();

    } else if(response.statusCode < 200 || response.statusCode >= 300) {

        throw new Error();

    }

}

let handlerTo = (error, response, body) => {

    if(response.statusCode == 401) {

        throw JwtAuthRequired();

    } else if(response.statusCode == 409) {

        throw Exists();

    } else if(response.statusCode < 200 || response.statusCode >= 300) {

        throw new Error(error);

    }

}

